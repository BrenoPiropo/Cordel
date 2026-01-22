// src/app/layout.tsx
/*quem somos. 
temática de cordel.
juristas e suas histórias.
blog com artigos.
newsletter.
galeria de fotos da equipe.
dicionário bibliográfico com mapa

*/
import AboutUs from '@/components/AboutUs';
import './globals.css';
import type { Metadata } from 'next'; 
import ValuesSection from '@/components/ValuesSection';

export const metadata: Metadata = {
  title: 'CORDEL | História & Direito',
  description: 'Acesse biografias em formato cordel, artigos e a memória digital do Direito da Bahia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
      <AboutUs />
      
      <ValuesSection />
        {children}
      </body>
    </html>
  );
}