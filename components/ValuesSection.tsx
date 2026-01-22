// src/components/ValuesSection.tsx
import React from 'react';
import styles from './ValuesSection.module.css';

// ------------------------------------------------------------------
// 📚 Tipagem e Dados
// ------------------------------------------------------------------

interface ValueItem {
  id: number;
  text: string;
}

// Lista de valores do grupo de pesquisa
const CORE_VALUES: ValueItem[] = [
  { id: 1, text: 'Rigor Científico' },
  { id: 2, text: 'Interdisciplinaridade' },
  { id: 3, text: 'Preservação da Memória' },
  { id: 4, text: 'Colaboração e Coletividade' },
  { id: 5, text: 'Inovação Acadêmica' },
  { id: 6, text: 'Educação e Formação' },
];

const ValuesSection: React.FC = () => {
  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        
        <h2 className={styles.sectionTitle}>Valores do Grupo de Pesquisa</h2>

        {/* Layout em Grid/Lista */}
        <div className={styles.valuesGrid}>
          {CORE_VALUES.map((item) => (
            <div key={item.id} className={styles.valueCard}>
              {/* O número (ID) serve como um ícone visual de destaque */}
              <span className={styles.valueIcon}>{item.id}</span>
              <h3 className={styles.valueText}>{item.text}</h3>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
export default ValuesSection;
