// src/app/layout.tsx (Para referência)
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header /> 

        {children} {/* Aqui é onde o Hero e o restante da LP são renderizados */}
      </body>
    </html>
  );
}