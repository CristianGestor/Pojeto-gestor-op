// src/App.jsx

import { useState, useEffect } from 'react'; // Passo 1: Importar useEffect
import { supabase } from './supabaseClient';
import OperacaoForm from './components/OperacaoForm';
import OperacoesList from './components/OperacoesList';
import './App.css';

function App() {
  const [operacoes, setOperacoes] = useState([]);
  // Passo 2: Criar um estado para armazenar o plano de contas
  const [planoDeContas, setPlanoDeContas] = useState([]);
  
  const [newDescricao, setNewDescricao] = useState('');
  const [newValor, setNewValor] = useState('');
  
  // Passo 3: Usar useEffect para buscar os dados do plano de contas
  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchPlanoDeContas = async () => {
      const { data, error } = await supabase
        .from('plano_de_contas')
        .select('*')
        .order('codigo', { ascending: true }); // Ordenamos pelo código para manter a hierarquia

      if (error) {
        console.error('Erro ao buscar plano de contas:', error);
      } else {
        setPlanoDeContas(data); // Armazena os dados no estado
      }
    };

    // Chama a função de busca
    fetchPlanoDeContas();
    fetchOperacoes(); // Mantemos a busca de operações que já existia
  }, []); // O array vazio [] garante que isso rode apenas uma vez, quando o app carregar

  const fetchOperacoes = async () => {
    const { data, error } = await supabase.from('operacoes').select('*');
    if (error) console.log('error', error);
    else setOperacoes(data);
  };

  const handleCreateOperacao = async () => {
    // A lógica de criação será atualizada no próximo passo
    // Por enquanto, vamos nos concentrar em carregar os dados
    console.log("A lógica de criação será implementada em breve.");
  };

  const handleDeleteOperacao = async (id) => {
    const { error } = await supabase.from('operacoes').delete().eq('id', id);
    if (error) console.log('error', error);
    else setOperacoes(operacoes.filter((op) => op.id !== id));
  };

  const handleUpdateOperacao = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from('operacoes')
      .update(updatedFields)
      .eq('id', id)
      .select();

    if (error) {
      console.log('error', error);
    } else {
      setOperacoes(operacoes.map((op) => (op.id === id ? data[0] : op)));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Operações</h1>
        {/* Passo 4: Passar o plano de contas como prop para o formulário */}
        <OperacaoForm
          newDescricao={newDescricao}
          setNewDescricao={setNewDescricao}
          newValor={newValor}
          setNewValor={setNewValor}
          handleCreateOperacao={handleCreateOperacao}
          planoDeContas={planoDeContas} 
        />
        <OperacoesList
          operacoes={operacoes}
          handleUpdateOperacao={handleUpdateOperacao}
          handleDeleteOperacao={handleDeleteOperacao}
        />
      </header>
    </div>
  );
}

export default App;
