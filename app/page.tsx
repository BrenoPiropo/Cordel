import AboutUs from '@/components/AboutUs';
import ValuesSection from '@/components/ValuesSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Quem Somos: Impacto inicial */}
      <AboutUs />
      
      {/* 2. Valores: Pilares do projeto */}
      <ValuesSection />

    
    </>
  );
}