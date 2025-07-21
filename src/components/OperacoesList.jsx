// src/components/OperacoesList.jsx
import React from 'react';
import OperacaoItem from './OperacaoItem';

function OperacoesList({ 
  operacoes, 
  editingId, 
  handlers, 
  editStates 
}) {
  return (
    <div className="operacoes-list">
      <h2>Operações Registradas</h2>
      {operacoes.map((op) => (
        <OperacaoItem 
          key={op.id}
          op={op}
          editingId={editingId}
          handleUpdate={handlers.handleUpdate}
          handleDelete={handlers.handleDelete}
          handleStartEdit={handlers.handleStartEdit}
          handleCancelEdit={handlers.handleCancelEdit}
          editStates={editStates}
        />
      ))}
    </div>
  );
}

export default OperacoesList;
