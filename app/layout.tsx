// src/app/layout.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header /> 
        
        {/* Aqui entra o conteúdo de QUALQUER página que você criar */}
        {children} 

        <Footer />
      </body>
    </html>
  );
}