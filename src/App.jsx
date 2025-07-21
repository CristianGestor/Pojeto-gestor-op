// src/App.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import OperacaoForm from './components/OperacaoForm';
import OperacoesList from './components/OperacoesList';
import './App.css';

function App() {
  const [operacoes, setOperacoes] = useState([]);
  
  // States do formulário de CRIAÇÃO
  const [newName, setNewName] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [newValor, setNewValor] = useState('');
  const [newData, setNewData] = useState('');
  const [newStatus, setNewStatus] = useState('Pendente');

  // States do formulário de EDIÇÃO
  const [editingId, setEditingId] = useState(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [editTipo, setEditTipo] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editData, setEditData] = useState('');
  const [editStatus, setEditStatus] = useState('');

  // --- LÓGICA DE DADOS (FUNÇÕES) ---
  useEffect(() => {
    getOperacoes();
  }, []);

  async function getOperacoes() {
    const { data } = await supabase.from('operacoes').select('*');
    setOperacoes(data || []);
  }

  async function handleCreateOperacao(e) {
    e.preventDefault();
    if (!newName || !newValor || !newData || !newTipo) return;
    const { data, error } = await supabase.from('operacoes').insert([{ Descricao: newName, Tipo: newTipo, Valor: newValor, Data: newData, Status: newStatus }]).select();
    if (error) {
      console.error("Erro:", error);
    } else if (data) {
      setOperacoes([...operacoes, data[0]]);
      setNewName(''); setNewTipo(''); setNewValor(''); setNewData(''); setNewStatus('Pendente');
    }
  }

  async function handleDeleteOperacao(id) {
    if (window.confirm("Tem certeza?")) {
      await supabase.from('operacoes').delete().eq('id', id);
      setOperacoes(operacoes.filter(op => op.id !== id));
    }
  }

  function handleStartEdit(op) {
    setEditingId(op.id);
    setEditDescricao(op.Descricao); setEditTipo(op.Tipo); setEditValor(op.Valor); setEditData(op.Data); setEditStatus(op.Status);
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  async function handleUpdateOperacao(e, id) {
    e.preventDefault();
    const { data } = await supabase.from('operacoes').update({ Descricao: editDescricao, Tipo: editTipo, Valor: editValor, Data: editData, Status: editStatus }).eq('id', id).select();
    setOperacoes(operacoes.map(op => op.id === id ? data[0] : op));
    setEditingId(null);
  }

  // Empacotando handlers e states para passar para os componentes filhos
  const listHandlers = { handleUpdate: handleUpdateOperacao, handleDelete: handleDeleteOperacao, handleStartEdit, handleCancelEdit };
  const editStates = { editDescricao, setEditDescricao, editTipo, setEditTipo, editValor, setEditValor, editData, setEditData, editStatus, setEditStatus };

  // --- RENDERIZAÇÃO DA INTERFACE ---
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
        
        <OperacoesList
          operacoes={operacoes}
          editingId={editingId}
          handlers={listHandlers}
          editStates={editStates}
        />
      </header>
    </div>
  );
}

export default App;
