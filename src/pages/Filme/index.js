import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import { toast } from 'react-toastify';
import { fetchReceitas } from '../../services/api'; // Importe a função fetchReceitas

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receita, setReceita] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReceita() {
      try {
        const receitasData = await fetchReceitas(); // Use a função fetchReceitas
        const selectedReceita = receitasData.find((receita) => receita.id === parseInt(id));

        if (!selectedReceita) {
          console.log('RECEITA NÃO ENCONTRADA');
          navigate('/', { replace: true });
          return;
        }

        setReceita(selectedReceita);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
        setLoading(false);
      }
    }

    loadReceita();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO');
    };
  }, [navigate, id]);

  function salvarReceita() {
    const minhaLista = localStorage.getItem('@meuapp');
    let receitasSalvas = JSON.parse(minhaLista) || [];

    const hasReceita = receitasSalvas.some((receitaSalva) => receitaSalva.id === receita.id);

    if (hasReceita) {
      toast.warn('Essa receita já está na sua lista!');
      return;
    }

    receitasSalvas.push(receita);
    localStorage.setItem('@meuapp', JSON.stringify(receitasSalvas));
    toast.success('Receita salva com sucesso!');
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{receita.titulo}</h1>
      <img src={receita.imagem} alt={receita.titulo} />

      <h3>Ingredientes</h3>
      <span>{receita.ingredientes}</span>

      <h3>Modo de Preparo</h3>
      <span>{receita.modoPreparo}</span>

      <div className="area-buttons">
        <button onClick={salvarReceita}>Salvar</button>
      </div>
    </div>
  );
}

export default Filme;
