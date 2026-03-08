import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flutter Developer Portfolio | Sabur Nayem',
  description:
    'Modern developer portfolio focused on Flutter mobile app development with NestJS backend services.',
  openGraph: {
    title: 'Flutter Developer Portfolio',
    description: 'Flutter mobile app developer portfolio powered by NestJS API.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{const stored=localStorage.getItem('theme');if(stored==='dark'||(!stored&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`}
        </Script>
        <Script id="sw-register" strategy="afterInteractive">
          {`if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});}`}
        </Script>
      </body>
    </html>
  );
}
