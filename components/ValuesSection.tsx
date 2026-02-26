"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ValuesSection.module.css';

interface ValueItem {
  titulo: string;
  texto: string;
}

const ValuesSection: React.FC = () => {
  const [valores, setValores] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValores = async () => {
      try {
        const res = await axios.get('http://localhost:3001/institucional');
        if (res.data && res.data.valores_json) {
          setValores(JSON.parse(res.data.valores_json));
        }
      } catch (error) {
        console.error("Erro ao carregar valores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchValores();
  }, []);

  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Valores do Grupo de Pesquisa</h2>
        <div className={styles.valuesGrid}>
          {!loading && valores.map((item, index) => (
            <div key={index} className={styles.valueCard}>
              <span className={styles.valueIcon}>{index + 1}</span>
              <h3 className={styles.valueText}>{item.titulo}</h3>
              {/* O texto que será revelado */}
              <p className={styles.valueDescription}>{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;