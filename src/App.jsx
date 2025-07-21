import React from 'react'; // <-- ESTA É A LINHA QUE ESTAVA FALTANDO
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [operacoes, setOperacoes] = useState([])

  useEffect(() => {
    // Função para buscar os dados no Supabase
    async function getOperacoes() {
      // O comando .from('operacoes').select('*') diz: "Na tabela 'operacoes', selecione todas as colunas"
      const { data, error } = await supabase.from('operacoes').select('*')
      
      if (error) {
        console.error('Erro ao buscar operações:', error)
      } else {
        // Se a busca deu certo, guardamos os dados no nosso estado 'operacoes'
        setOperacoes(data)
      }
    }

    // Executamos a função assim que o componente carrega
    getOperacoes()
  }, []) // O array vazio [] garante que isso só rode uma vez

  return (
    <>
      <h1>Gestor de Operações</h1>
      
      <div className="lista-operacoes">
        <h2>Lançamentos Recentes</h2>
        {operacoes.length === 0 ? (
          <p>Nenhuma operação encontrada ou carregando...</p>
        ) : (
          operacoes.map((op) => (
            <div key={op.id} className="operacao-item">
              <p><strong>Descrição:</strong> {op.descricao}</p>
              <p><strong>Tipo:</strong> {op.tipo}</p>
              <p><strong>Valor:</strong> R\$ {op.valor}</p>
              <p><strong>Data:</strong> {new Date(op.data_operacao).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App
