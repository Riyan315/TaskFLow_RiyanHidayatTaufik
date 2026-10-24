import { useMemo, useState } from 'react'
import Header from './components/Header'
import SummaryCard from './components/SummaryCard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Toolbar from './components/Toolbar'
import { parseDeadline } from './utils/deadline'
import './App.css'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function sortTasks(tasks, sortBy) {
  if (sortBy === 'newest') return tasks

  const direction = sortBy === 'deadline-asc' ? 1 : -1
  const timeOf = (task) => parseDeadline(task.deadline)?.getTime() ?? null

  return [...tasks].sort((a, b) => {
    const aTime = timeOf(a)
    const bTime = timeOf(b)
    if (aTime === null && bTime === null) return 0
    if (aTime === null) return 1
    if (bTime === null) return -1
    return (aTime - bTime) * direction
  })
}

function App() {
  // FR-08: data tugas disimpan di array useState (tanpa mutasi langsung)
  const [tasks, setTasks] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const editingTask = tasks.find((task) => task.id === editingId) ?? null

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

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleEditTask = (id) => {
    setEditingId(id)
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

  const resetFilters = () => {
    setQuery('')
    setStatusFilter('all')
    setPriorityFilter('all')
  }

  const isFiltered =
    query.trim() !== '' || statusFilter !== 'all' || priorityFilter !== 'all'

  // FR-04 & FR-05: pencarian, filter, lalu pengurutan berdasarkan deadline.
  const visibleTasks = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    const filtered = tasks
      .filter(
        (task) =>
          !keyword ||
          task.title.toLowerCase().includes(keyword) ||
          task.course.toLowerCase().includes(keyword),
      )
      .filter((task) => {
        if (statusFilter === 'done') return task.completed
        if (statusFilter === 'pending') return !task.completed
        return true
      })
      .filter(
        (task) => priorityFilter === 'all' || task.priority === priorityFilter,
      )

    return sortTasks(filtered, sortBy)
  }, [tasks, query, statusFilter, priorityFilter, sortBy])

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
            <h2 id="form-title" className="panel__title">
              {editingTask ? 'Edit tugas' : 'Tambah tugas'}
            </h2>
            <TaskForm
              key={editingTask?.id ?? 'new'}
              initialTask={editingTask}
              onSubmit={handleSubmitTask}
              onCancel={() => setEditingId(null)}
            />
          </section>

          <section className="panel" id="daftar" aria-labelledby="list-title">
            <h2 id="list-title" className="panel__title">Daftar tugas</h2>
            <Toolbar
              query={query}
              onQueryChange={setQuery}
              status={statusFilter}
              onStatusChange={setStatusFilter}
              priority={priorityFilter}
              onPriorityChange={setPriorityFilter}
              sort={sortBy}
              onSortChange={setSortBy}
              resultCount={visibleTasks.length}
              totalCount={total}
              isFiltered={isFiltered}
              onReset={resetFilters}
            />
            <TaskList
              tasks={visibleTasks}
              hasAnyTask={total > 0}
              editingId={editingId}
              onToggleTask={handleToggleTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
