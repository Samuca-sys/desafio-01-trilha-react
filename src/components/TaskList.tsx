import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  //Cria nov task com id random, impedindo a criação caso title vazio
  function handleCreateNewTask() {
    //se input vazia, não retorna nada
    if (!newTaskTitle) return;

    //senao cria nova task com id aleatorio, title input value e nao completa
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    //adiciona nova task a lista de tasks
    setTasks(tasks => [...tasks, newTask])

    //seta vazio para title
    setNewTaskTitle('')

    // Crie uma nova task com um id random, 
    // não permita criar caso o título seja vazio.

  }
  //Altera o campo isComplete da task entre 'true' ou 'false, pelo seu id
  function handleToggleTaskCompletion(id: number) {
    //constante que contém mapeamento de task, se com id igual do parâmetro,
    //lista todas tasks e sobrescreve proprieda isComplete 
    //e inverte seu valor, se id diferente retorna somente a task
    const mappedTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    //seta lista de tasks com lista ja mapeada
    setTasks(mappedTasks)
  }
  //Remove task da listagem pelo seu ID
  function handleRemoveTask(id: number) {
    //constante que contém filtro de task com id difente do parâmetro
    const filteredTasksById = (tasks.filter(task => task.id !== id))

    //seta lista de tasks com lista ja filtrada
    setTasks(filteredTasksById)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}