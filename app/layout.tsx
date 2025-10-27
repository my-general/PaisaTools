// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Update these lines
  title: 'PaisaTools - Free Financial Calculators for India',
  description: 'Free, fast, and accurate financial calculators for SIP, Income Tax, Home Loans, and more. Plan your finances with PaisaTools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><meta name="google-site-verification" content="DR5wwyw4SOKrjVlMzFjfvYgJAsQbjZOjze3J7VS-4ds" /></head>
      <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
