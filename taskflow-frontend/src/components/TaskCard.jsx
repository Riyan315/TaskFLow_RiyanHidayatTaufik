const PRIORITY_CLASS = {
  Tinggi: 'badge--high',
  Sedang: 'badge--medium',
  Rendah: 'badge--low',
}

function formatDeadline(value) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.7 2.7L16 9.5" />
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function TaskCard({ task, onToggle }) {
  const { id, title, course, deadline, priority, completed } = task

  return (
    <li className={`task-card ${completed ? 'task-card--done' : ''}`}>
      <div className="task-card__main">
        <h3 className="task-card__title">{title}</h3>
        <p className="task-card__meta">
          {course} &middot; Deadline {formatDeadline(deadline)}
        </p>
      </div>

      <div className="task-card__side">
        <span className={`badge ${PRIORITY_CLASS[priority]}`}>
          Prioritas {priority}
        </span>
        <button
          type="button"
          className={`status-btn ${completed ? 'status-btn--done' : ''}`}
          onClick={() => onToggle(id)}
          aria-pressed={completed}
          aria-label={
            completed
              ? `Tandai ${title} belum selesai`
              : `Tandai ${title} selesai`
          }
        >
          {completed ? <CheckIcon /> : <CircleIcon />}
          <span>{completed ? 'Selesai' : 'Belum selesai'}</span>
        </button>
      </div>
    </li>
  )
}

export default TaskCard
