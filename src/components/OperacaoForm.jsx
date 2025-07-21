// src/components/OperacaoForm.jsx
import React from 'react'; // GARANTE que o React está importado.

// NOTA: A lógica interna foi simplificada para os próximos passos.
// As props antigas que não existem mais (como newTipo) foram removidas.
function OperacaoForm({
  newDescricao,
  setNewDescricao,
  newValor,
  setNewValor,
  handleCreateOperacao,
  planoDeContas,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateOperacao(); // A lógica final virá depois
  };

  return (
    <form onSubmit={handleSubmit} className="operacao-form">
      <h3>Adicionar Nova Operação</h3>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          value={newDescricao}
          onChange={(e) => setNewDescricao(e.target.value)}
          placeholder="Descrição da operação"
          required
        />
      </div>
      <div>
        <label>Valor:</label>
        <input
          type="number"
          step="0.01"
          value={newValor}
          onChange={(e) => setNewValor(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>
      <div className="plano-contas-container">
         {/* Os menus de seleção do plano de contas aparecerão aqui em breve */}
         <p style={{ fontSize: '0.8em', color: 'lightgray' }}>
            Contas carregadas: {planoDeContas ? planoDeContas.length : 0}
         </p>
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default OperacaoForm;
