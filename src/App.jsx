import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [operacoes, setOperacoes] = useState([]);

  // States para os campos do formulário
  const [newName, setNewName] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [newValor, setNewValor] = useState('');
  const [newData, setNewData] = useState('');
  const [newStatus, setNewStatus] = useState('Pendente');

  useEffect(() => {
    getOperacoes();
  }, []);

  async function getOperacoes() {
    const { data } = await supabase.from('operacoes').select('*');
    setOperacoes(data || []);
  }

  async function handleCreateOperacao(e) {
    e.preventDefault();
    if (!newName || !newValor || !newData || !newTipo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Usando os nomes exatos das colunas que você confirmou
    const { data, error } = await supabase
      .from('operacoes')
      .insert([
        { Descricao: newName, Tipo: newTipo, Valor: newValor, Data: newData, Status: newStatus },
      ])
      .select();

    if (error) {
      console.error("Erro ao criar operação:", error);
      alert("Falha ao criar operação: " + error.message);
    } else {
      alert("Operação criada com sucesso!");
      setNewName('');
      setNewTipo('');
      setNewValor('');
      setNewData('');
      setNewStatus('Pendente');
      if (data) {
        setOperacoes([...operacoes, data[0]]);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Operações</h1>

        <form onSubmit={handleCreateOperacao} className="operacao-form">
          <h3>Adicionar Nova Operação</h3>
          <input
            type="text"
            placeholder="Descrição da Operação"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo (ex: Receita, Custo Fixo)"
            value={newTipo}
            onChange={(e) => setNewTipo(e.target.value)}
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

        <h2>Operações Registradas</h2>
        <div className="operacoes-list">
          {operacoes.map((op) => (
            // Usando os nomes exatos das colunas que você confirmou
            <div key={op.id} className="operacao-card">
              <h3>{op.Descricao}</h3>
              <p>Tipo: {op.Tipo}</p>
              <h4>Valor: R\$ {op.Valor}</h4>
              <p>Data: {new Date(op.Data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
              <p>Status: {op.Status}</p>
            </div>
          ))}
        </div>
        
      </header>
    </div>
  );
}

export default App;
