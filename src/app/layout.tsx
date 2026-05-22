import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { AppProvider } from '@/components/providers/AppProvider';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dice-palace.vercel.app';

const miniAppEmbed = {
  version: '1',
  imageUrl: `${APP_URL}/opengraph-image`,
  button: {
    title: 'Roll the Dice',
    action: {
      type: 'launch_miniapp',
      name: 'Dice Palace',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#2a2520',
    },
  },
};

export const metadata: Metadata = {
  title: 'Dice Palace',
  description: 'Classic Sic Bo on Base. Bet on Big, Small, Sum, Doubles and Triples. Record your best score on-chain.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Dice Palace',
    description: 'Classic Sic Bo dice game on Base',
    type: 'website',
    images: ['/og-image.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
