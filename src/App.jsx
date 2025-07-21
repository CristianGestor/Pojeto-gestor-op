import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  // State para guardar a lista de operações que vem do banco
  const [operacoes, setOperacoes] = useState([]);

  // States para controlar os campos do formulário de nova operação
  const [newName, setNewName] = useState('');
  const [newValor, setNewValor] = useState('');
  const [newData, setNewData] = useState('');
  const [newStatus, setNewStatus] = useState('Pendente'); // Valor padrão

  // useEffect para buscar os dados quando o componente carregar
  useEffect(() => {
    getOperacoes();
  }, []);

  // Função para buscar os dados no Supabase
  async function getOperacoes() {
    const { data } = await supabase.from('operacoes').select();
    setOperacoes(data);
  }

  // Função para lidar com o envio do formulário
  async function handleCreateOperacao(e) {
    // Previne o recarregamento padrão da página ao submeter o form
    e.preventDefault();

    // Validação simples para não enviar dados em branco
    if (!newName || !newValor || !newData) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Envia os dados para a tabela 'operacoes' no Supabase
    const { data, error } = await supabase
      .from('operacoes')
     .insert([
  { name: newName, valor: newValor, data_lancamento: newData, status: newStatus },
])
      .select();

    if (error) {
      console.error("Erro ao criar operação:", error);
      alert("Falha ao criar operação: " + error.message);
    } else {
      alert("Operação criada com sucesso!");
      // Limpa os campos do formulário
      setNewName('');
      setNewValor('');
      setNewData('');
      setNewStatus('Pendente');
      
      // Atualiza a lista na tela adicionando o novo registro
      // O 'data[0]' pega o registro que acabamos de inserir
      if (data) {
        setOperacoes([...operacoes, data[0]]);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Operações</h1>

        {/* Formulário para criar nova operação */}
        <form onSubmit={handleCreateOperacao} className="operacao-form">
          <h3>Adicionar Nova Operação</h3>
          <input
            type="text"
            placeholder="Nome da Operação"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={newValor}
            onChange={(e) => setNewValor(e.target.value)}
          />
          <input
            type="date"
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
          />
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Pago">Pago</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button type="submit">Salvar</button>
        </form>

        <hr />

        {/* Lista de operações existentes */}
        <h2>Operações Registradas</h2>
        <div className="operacoes-list">
          {operacoes.map((op) => (
            <div key={op.id} className="operacao-card">
              <h3>{op.name}</h3>
              <h4>Valor: R\$ {op.valor}</h4>
              <p>Data: {new Date(op.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
              <p>Status: {op.status}</p>
            </div>
          ))}
        </div>
        
      </header>
    </div>
  );
}

export default App;
