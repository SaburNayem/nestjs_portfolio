import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { AdminUser } from './entities/admin-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminRepo: Repository<AdminUser>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AdminUser> {
    const user = await this.adminRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email, name: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async createAdminIfNotExists(email: string, password: string, name = 'Admin') {
    const existing = await this.adminRepo.findOne({ where: { email } });
    if (existing) {
      return existing;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.adminRepo.create({ email, passwordHash, name });
    return this.adminRepo.save(user);
  }
}
