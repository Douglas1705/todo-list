import { useState, useEffect } from 'react'; // Importa hooks do React
import { TrashIcon } from '@heroicons/react/24/solid';
// Importa a imagem de ícone de lixeira

// Define a interface para a estrutura de uma Tarefa
interface Tarefa {
  id: string; // Identificador único da tarefa
  texto: string; // Texto da tarefa
}

function Todo() {
  // Estado para armazenar a lista de tarefas
  const [tarefas, definirTarefas] = useState<Tarefa[]>([]);
  // Estado para armazenar o texto da nova tarefa
  const [texto, definirTexto] = useState<string>('');

  // Hook useEffect para carregar tarefas do localStorage quando o componente monta
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('tarefas'); // Recupera tarefas salvas do localStorage
    if (tarefasSalvas) {
      definirTarefas(JSON.parse(tarefasSalvas)); // Atualiza o estado com as tarefas salvas
    }
  }, []); // Array vazio indica que o efeito roda apenas uma vez, quando o componente monta

  // Hook useEffect para salvar tarefas no localStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva a lista de tarefas no localStorage
  }, [tarefas]); // Roda o efeito sempre que o estado `tarefas` mudar

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = (e: React.FormEvent) => {
    e.preventDefault(); // Impede a submissão do formulário e o recarregamento da página

    if (!texto.trim()) return; // Verifica se o texto não está vazio

    const novaTarefa: Tarefa = {
      id: Date.now().toString(), // Gera um ID único baseado no tempo atual
      texto: texto.trim(), // Remove espaços em branco no início e no final do texto
    };

    definirTarefas([...tarefas, novaTarefa]); // Adiciona a nova tarefa à lista de tarefas
    definirTexto(''); // Limpa o campo de texto após adicionar a tarefa
  };

  // Função para remover uma tarefa da lista pelo ID
  const removerTarefa = (id: string) => {
    definirTarefas(tarefas.filter((tarefa) => tarefa.id !== id)); // Remove a tarefa com o ID fornecido
  };

  return (
    <section className="container max-w-screen-lg mx-auto flex flex-col justify-center pt-5 gap-9">
      <h1 className="text-center text-4xl font-bold font-zen-loop">
        Lista de tarefas
      </h1>
      <form className="task-form px-6" onSubmit={adicionarTarefa}>
        <input
          type="text"
          id="task-input"
          placeholder="Digite uma tarefa..."
          value={texto} // Liga o valor do input ao estado `texto`
          onChange={(e) => definirTexto(e.target.value)} // Atualiza o estado `texto` ao digitar
          required
          className="border-b-4 border-b-red-700 block w-full text-center text-pink-900 text-2xl focus:none focus:outline-none"
        />
        <button
          type="submit"
          className="border-2 border-slate-950 text-black text-2xl p-3 rounded-3xl w-full mt-10 hover:bg-black hover:text-white"
        >
          ADICIONAR
        </button>
      </form>
      <ul className="flex flex-col gap-6">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="p-6 flex justify-between items-center text-2xl gap-2 overflow-auto"
          >
            <div className="overflow-auto">
              <p>{tarefa.texto}</p>
            </div>
            <button
              className="bg-red-300 p-3 rounded-lg hover:bg-red-600"
              onClick={() => removerTarefa(tarefa.id)}
            >
              <TrashIcon className="size-6 text-red-900" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;
