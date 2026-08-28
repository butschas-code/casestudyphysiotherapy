import type { Metadata } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'KUSTĪBA — Physiotherapy Website Concept by Saiteo',
  description:
    'A speculative Saiteo website concept showing how a growing physiotherapy practice can communicate its strengths, simplify service discovery and improve the path to booking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lv">
      <body className={`${manrope.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
