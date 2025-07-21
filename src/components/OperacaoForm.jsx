// src/components/OperacaoForm.jsx

import React from 'react'; // <-- ADICIONE OU GARANTA QUE ESTA LINHA EXISTA

// O restante do seu componente OperacaoForm...
function OperacaoForm({
  newDescricao,
  setNewDescricao,
  newValor,
  setNewValor,
  handleCreateOperacao,
  planoDeContas, // Recebe o plano de contas
}) {
  // ... toda a lógica e o JSX do formulário
  return (
    <div>
      {/* ... conteúdo do formulário ... */}
    </div>
  );
}

export default OperacaoForm;


import React from 'react';

// O componente recebe várias "props" (propriedades) do componente pai (App.jsx)
// para poder funcionar.
function OperacaoForm({ 
  handleCreate, 
  newName, setNewName,
  newTipo, setNewTipo,
  newValor, setNewValor,
  newData, setNewData,
  newStatus, setNewStatus 
}) {
  return (
    <form onSubmit={handleCreate} className="operacao-form">
      <h3>Adicionar Nova Operação</h3>
      <input type="text" placeholder="Descrição da Operação" value={newName} onChange={(e) => setNewName(e.target.value)} />
      <select value={newTipo} onChange={(e) => setNewTipo(e.target.value)} required>
  <option value="" disabled>Selecione o Tipo</option>
  <option value="Receita">Receita</option>
  <option value="Custo Variável">Custo Variável</option>
  <option value="Custo Fixo">Custo Fixo</option>
</select>
      <input type="number" placeholder="Valor" value={newValor} onChange={(e) => setNewValor(e.target.value)} />
      <input type="date" value={newData} onChange={(e) => setNewData(e.target.value)} />
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        <option value="Pendente">Pendente</option>
        <option value="Pago">Pago</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <button type="submit">Salvar Nova</button>
    </form>
  );
}

export default OperacaoForm;
