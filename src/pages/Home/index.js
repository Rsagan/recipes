import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchReceitas } from '../../services/api'; // Importe a função fetchReceitas
import './home.css';

function Home() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReceitas() {
      try {
        const receitasData = await fetchReceitas(); // Use a função fetchReceitas
        setReceitas(receitasData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        setLoading(false);
      }
    }

    loadReceitas();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando receitas...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {receitas.map((receita) => (
          <article key={receita.id}>
            <strong>{receita.titulo}</strong>
            <img src={receita.imagem} alt={receita.titulo} />
            <Link to={`/filme/${receita.id}`}>Como fazer ?</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
