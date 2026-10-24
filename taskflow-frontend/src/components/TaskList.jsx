import TaskCard from './TaskCard'
import EmptyState from './EmptyState'

function TaskList({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  editingId,
  hasAnyTask,
}) {
  if (tasks.length === 0) {
    if (hasAnyTask) {
      return (
        <EmptyState
          title="Tidak ada tugas yang cocok."
          text="Coba kata kunci lain, atau reset filter yang sedang aktif."
        />
      )
    }
    return <EmptyState />
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isEditing={task.id === editingId}
          onToggle={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
