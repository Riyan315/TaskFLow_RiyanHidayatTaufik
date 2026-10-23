import { useState } from 'react'
import Header from './components/Header'
import SummaryCard from './components/SummaryCard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function App() {
  // FR-08: data tugas disimpan di array useState (tanpa mutasi langsung)
  const [tasks, setTasks] = useState([])

  const handleAddTask = (newTask) => {
    setTasks((prev) => [{ id: createId(), completed: false, ...newTask }, ...prev])
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  // FR-02: angka dihitung dari data aktual
  const total = tasks.length
  const done = tasks.filter((task) => task.completed).length
  const pending = total - done

  return (
    <div className="app">
      <Header />

      <main className="dashboard" id="main">
        <section className="summary" id="ringkasan" aria-label="Ringkasan tugas">
          <SummaryCard label="Total tugas" value={total} />
          <SummaryCard label="Belum selesai" value={pending} />
          <SummaryCard label="Selesai" value={done} />
        </section>

        <div className="content">
          <section className="panel" id="tambah" aria-labelledby="form-title">
            <h2 id="form-title" className="panel__title">Tambah tugas</h2>
            <TaskForm onAddTask={handleAddTask} />
          </section>

          <section className="panel" id="daftar" aria-labelledby="list-title">
            <h2 id="list-title" className="panel__title">Daftar tugas</h2>
            <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
