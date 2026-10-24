import EmptyState from '../components/EmptyState'
import TaskList from '../components/TaskList'

function CompletedView({
  tasks,
  editingId,
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
}) {
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <section className="panel" aria-labelledby="completed-title">
      <h2 id="completed-title" className="panel__title">Tugas selesai</h2>
      <p className="panel__subtitle">
        {completedTasks.length > 0
          ? `${completedTasks.length} tugas sudah ditandai selesai.`
          : 'Belum ada tugas yang ditandai selesai.'}
      </p>

      {completedTasks.length > 0 ? (
        <TaskList
          tasks={completedTasks}
          hasAnyTask
          editingId={editingId}
          onUpdateStatus={onUpdateStatus}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ) : (
        <EmptyState
          title="Belum ada tugas selesai."
          text="Tandai tugas sebagai selesai dari halaman Dashboard atau Kalender, dan tugasnya akan muncul di sini."
        />
      )}
    </section>
  )
}

export default CompletedView
