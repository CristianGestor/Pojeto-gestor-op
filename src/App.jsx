// src/App.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
// Importando nosso novo componente
import OperacaoForm from './components/OperacaoForm'; 
import './App.css';

function App() {
  const [operacoes, setOperacoes] = useState([]);
  
  const [newName, setNewName] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [newValor, setNewValor] = useState('');
  const [newData, setNewData] = useState('');
  const [newStatus, setNewStatus] = useState('Pendente');

  const [editingId, setEditingId] = useState(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [editTipo, setEditTipo] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editData, setEditData] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => { getOperacoes(); }, []);

  async function getOperacoes() { /* ...código sem alteração... */ }
  async function handleCreateOperacao(e) { /* ...código sem alteração... */ }
  async function handleDeleteOperacao(id) { /* ...código sem alteração... */ }
  function handleStartEdit(op) { /* ...código sem alteração... */ }
  function handleCancelEdit() { /* ...código sem alteração... */ }
  async function handleUpdateOperacao(e, id) { /* ...código sem alteração... */ }
    // OBS: Para não deixar o código gigante, omiti o interior das funções
    // que não foram alteradas. Use as versões do seu arquivo atual.
    // A única alteração real está no 'return' no final do arquivo.

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Operações</h1>
        
        {/* Chamando nosso novo componente e passando as props necessárias */}
        <OperacaoForm 
          handleCreate={handleCreateOperacao}
          newName={newName} setNewName={setNewName}
          newTipo={newTipo} setNewTipo={setNewTipo}
          newValor={newValor} setNewValor={setNewValor}
          newData={newData} setNewData={setNewData}
          newStatus={newStatus} setNewStatus={setNewStatus}
        />

        <hr />
        <h2>Operações Registradas</h2>
        <div className="operacoes-list">
          {operacoes.map((op) => (
            <div key={op.id} className="operacao-card">
              {editingId === op.id ? (
                // MODO DE EDIÇÃO (ainda aqui por enquanto)
                <form onSubmit={(e) => handleUpdateOperacao(e, op.id)}>{/* ... */}</form>
              ) : (
                // MODO DE VISUALIZAÇÃO (ainda aqui por enquanto)
                <>{/* ... */}</>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

// *** CÓDIGO COMPLETO DO App.jsx PARA VOCÊ COPIAR ***
// (para evitar confusão com as omissões acima)
function FullApp() {
  const [operacoes, setOperacoes] = useState([]);
  
  const [newName, setNewName] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [newValor, setNewValor] = useState('');
  const [newData, setNewData] = useState('');
  const [newStatus, setNewStatus] = useState('Pendente');

  const [editingId, setEditingId] = useState(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [editTipo, setEditTipo] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editData, setEditData] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => { getOperacoes(); }, []);

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
    const { data, error } = await supabase.from('operacoes').insert([{ Descricao: newName, Tipo: newTipo, Valor: newValor, Data: newData, Status: newStatus }]).select();
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

  async function handleDeleteOperacao(id) {
    const isConfirmed = window.confirm("Tem certeza de que deseja excluir esta operação?");
    if (isConfirmed) {
      const { error } = await supabase.from('operacoes').delete().eq('id', id);
      if (error) {
        alert("Falha ao deletar operação: " + error.message);
      } else {
        setOperacoes(operacoes.filter(op => op.id !== id));
      }
    }
  }

  function handleStartEdit(op) {
    setEditingId(op.id);
    setEditDescricao(op.Descricao);
    setEditTipo(op.Tipo);
    setEditValor(op.Valor);
    setEditData(op.Data);
    setEditStatus(op.Status);
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  async function handleUpdateOperacao(e, id) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('operacoes')
      .update({ Descricao: editDescricao, Tipo: editTipo, Valor: editValor, Data: editData, Status: editStatus })
      .eq('id', id)
      .select();

    if (error) {
      alert("Falha ao atualizar operação: " + error.message);
    } else {
      setOperacoes(operacoes.map(op => op.id === id ? data[0] : op));
      setEditingId(null);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Operações</h1>
        
        <OperacaoForm 
          handleCreate={handleCreateOperacao}
          newName={newName} setNewName={setNewName}
          newTipo={newTipo} setNewTipo={setNewTipo}
          newValor={newValor} setNewValor={setNewValor}
          newData={newData} setNewData={setNewData}
          newStatus={newStatus} setNewStatus={setNewStatus}
        />

        <hr />
        <h2>Operações Registradas</h2>
        <div className="operacoes-list">
          {operacoes.map((op) => (
            <div key={op.id} className="operacao-card">
              {editingId === op.id ? (
                <form onSubmit={(e) => handleUpdateOperacao(e, op.id)}>
                  <input type="text" value={editDescricao} onChange={(e) => setEditDescricao(e.target.value)} />
                  <input type="text" value={editTipo} onChange={(e) => setEditTipo(e.target.value)} />
                  <input type="number" value={editValor} onChange={(e) => setEditValor(e.target.value)} />
                  <input type="date" value={editData} onChange={(e) => setEditData(e.target.value)} />
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                  <button type="submit">Salvar Alterações</button>
                  <button type="button" onClick={handleCancelEdit}>Cancelar</button>
                </form>
              ) : (
                <>
                  <h3>{op.Descricao}</h3>
                  <p>Tipo: {op.Tipo}</p>
                  <h4>Valor: R\$ {op.Valor}</h4>
                  <p>Data: {new Date(op.Data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                  <p>Status: {op.Status}</p>
                  <button onClick={() => handleStartEdit(op)}>Editar</button>
                  <button onClick={() => handleDeleteOperacao(op.id)} className="delete-button">Excluir</button>
                </>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

// Substitua o export padrão por este que usa a função completa
export default FullApp;
