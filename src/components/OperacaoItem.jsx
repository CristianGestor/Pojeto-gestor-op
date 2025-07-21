// src/components/OperacaoItem.jsx
import React from 'react';

function OperacaoItem({ 
  op, 
  editingId, 
  handleUpdate, 
  handleDelete, 
  handleStartEdit, 
  handleCancelEdit,
  editStates 
}) {
  
  const { editDescricao, setEditDescricao, editTipo, setEditTipo, editValor, setEditValor, editData, setEditData, editStatus, setEditStatus } = editStates;

  if (editingId === op.id) {
    // MODO DE EDIÇÃO
    return (
      <form onSubmit={(e) => handleUpdate(e, op.id)} className="operacao-card-edit">
        <input type="text" value={editDescricao} onChange={(e) => setEditDescricao(e.target.value)} />
        <select value={editTipo} onChange={(e) => setEditTipo(e.target.value)}>
  <option value="Receita">Receita</option>
  <option value="Custo Variável">Custo Variável</option>
  <option value="Custo Fixo">Custo Fixo</option>
</select>
        <input type="number" value={editValor} onChange={(e) => setEditValor(e.target.value)} />
        <input type="date" value={editData} onChange={(e) => setEditData(e.target.value)} />
        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
          <option value="Pendente">Pendente</option>
          <option value="Pago">Pago</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleCancelEdit}>Cancelar</button>
      </form>
    );
  } else {
    // MODO DE VISUALIZAÇÃO
    return (
      <div className="operacao-card">
        <h3>{op.Descricao}</h3>
        <p>Tipo: {op.Tipo}</p>
        <h4>Valor: R\$ {op.Valor}</h4>
        <p>Data: {new Date(op.Data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
        <p>Status: {op.Status}</p>
        <button onClick={() => handleStartEdit(op)}>Editar</button>
        <button onClick={() => handleDelete(op.id)} className="delete-button">Excluir</button>
      </div>
    );
  }
}

export default OperacaoItem;
