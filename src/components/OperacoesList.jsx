// src/components/OperacoesList.jsx
import React from 'react'; // GARANTE que o React está importado.

function OperacoesList({ operacoes, handleUpdateOperacao, handleDeleteOperacao }) {
  if (!operacoes || operacoes.length === 0) {
    return <p>Nenhuma operação encontrada.</p>;
  }

  return (
    <div className="operacoes-list">
      <h3>Operações Recentes</h3>
      <ul>
        {operacoes.map((op) => (
          <li key={op.id}>
            <span>{new Date(op.created_at).toLocaleDateString()}</span>
            <span>{op.descricao}</span>
            {/* A conta virá aqui no futuro */}
            <span>R\$ {op.valor.toFixed(2)}</span>
            <button onClick={() => handleDeleteOperacao(op.id)} className="delete-btn">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OperacoesList;
