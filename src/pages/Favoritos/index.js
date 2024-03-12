import React, { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchReceitas } from '../../services/api'; // Importe a função fetchReceitas

function Favoritos() {
  const [receitas, setReceitas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function loadReceitas() {
      try {
        const receitasData = await fetchReceitas();
        setReceitas(receitasData);

        const minhaLista = localStorage.getItem('@meuapp');
        setFavoritos(JSON.parse(minhaLista) || []);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    }

    loadReceitas();
  }, []);

  function excluirReceita(id) {
    const filtroFavoritos = favoritos.filter((item) => item.id !== id);
    setFavoritos(filtroFavoritos);
    localStorage.setItem('@meuapp', JSON.stringify(filtroFavoritos));
    toast.success('Receita removida com sucesso');
  }

  return (
    <div className="meus-filmes">
      <h1>Minhas Receitas </h1>

      {favoritos.length === 0 && <span>Você não possui nenhuma receita salva :(</span>}

      <ul>
        {favoritos.map((item) => {
          const receita = receitas.find((receita) => receita.id === item.id);
          if (!receita) {
            return null;
          }

          return (
            <li key={receita.id}>
              <span>{receita.titulo}</span>

              <div>
                <Link to={`/filme/${receita.id}`}>Saiba mais...</Link>
                <button onClick={() => excluirReceita(receita.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
