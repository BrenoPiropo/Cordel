"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Verifica se é área administrativa para esconder Header/Footer padrão
  const isAdmin = pathname.startsWith('/dashboard') || pathname === '/login';

  return (
    <html lang="pt-BR">
      <body>
        {!isAdmin && <Header />}
        
        {children} 

        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}