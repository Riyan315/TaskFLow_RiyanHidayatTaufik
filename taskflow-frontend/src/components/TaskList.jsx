import TaskCard from './TaskCard'
import EmptyState from './EmptyState'

function TaskList({ tasks, onToggleTask }) {
  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={onToggleTask} />
      ))}
    </ul>
  )
}

export default TaskList
