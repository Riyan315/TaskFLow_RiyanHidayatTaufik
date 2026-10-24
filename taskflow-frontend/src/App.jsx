import { useRef, useState } from 'react'
import Header from './components/Header'
import DashboardView from './views/DashboardView'
import CalendarView from './views/CalendarView'
import CompletedView from './views/CompletedView'
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
  const [editingId, setEditingId] = useState(null)
  const [view, setView] = useState('dashboard')
  const mainRef = useRef(null)

  const editingTask = tasks.find((task) => task.id === editingId) ?? null

  const handleNavigate = (nextView) => {
    if (nextView === view) return
    setView(nextView)
    setEditingId(null)
    // Pindahkan fokus ke area konten supaya pengguna keyboard tidak tertinggal di nav.
    requestAnimationFrame(() => mainRef.current?.focus())
  }

  const handleAddTask = (newTask) => {
    setTasks((prev) => [{ id: createId(), completed: false, ...newTask }, ...prev])
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingId ? { ...task, ...updatedTask } : task,
      ),
    )
    setEditingId(null)
  }

  // Status selalu ditulis eksplisit (true/false), tidak pernah dibalik dari nilai lama.
  // Dengan begitu render ulang, filter, atau pindah halaman tidak bisa mengubah status.
  const updateTaskStatus = (id, completed) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: Boolean(completed) } : task,
      ),
    )
  }

  // Edit selalu dilakukan di form Dashboard.
  const handleEditTask = (id) => {
    setEditingId(id)
    if (view !== 'dashboard') setView('dashboard')
  }

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const handleSubmitTask = (values) => {
    if (editingTask) {
      handleUpdateTask(values)
    } else {
      handleAddTask(values)
    }
  }

  const sharedTaskProps = {
    tasks,
    editingId,
    onUpdateStatus: updateTaskStatus,
    onEditTask: handleEditTask,
    onDeleteTask: handleDeleteTask,
  }

  return (
    <div className="app">
      <Header view={view} onNavigate={handleNavigate} />

      <main className="dashboard" id="main" tabIndex={-1} ref={mainRef}>
        <div className="view" hidden={view !== 'dashboard'}>
          <DashboardView
            {...sharedTaskProps}
            editingTask={editingTask}
            onSubmitTask={handleSubmitTask}
            onCancelEdit={() => setEditingId(null)}
          />
        </div>

        <div className="view" hidden={view !== 'kalender'}>
          <CalendarView {...sharedTaskProps} />
        </div>

        <div className="view" hidden={view !== 'selesai'}>
          <CompletedView {...sharedTaskProps} />
        </div>
      </main>
    </div>
  )
}

export default App
