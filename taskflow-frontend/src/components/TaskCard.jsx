import { useEffect, useRef, useState } from 'react'
import { formatDeadline, getDeadlineStatus } from '../utils/deadline'

const PRIORITY_CLASS = {
  Tinggi: 'badge--high',
  Sedang: 'badge--medium',
  Rendah: 'badge--low',
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

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    </svg>
  )
}

function TaskCard({ task, onToggle, onEdit, onDelete, isEditing }) {
  const { id, title, course, deadline, priority, completed } = task
  const [confirming, setConfirming] = useState(false)
  const confirmRef = useRef(null)
  const deadlineStatus = getDeadlineStatus(deadline)

  // Fokus pindah ke tombol konfirmasi supaya pengguna keyboard tidak kehilangan posisi.
  useEffect(() => {
    if (confirming) confirmRef.current?.focus()
  }, [confirming])

  return (
    <li
      className={`task-card ${completed ? 'task-card--done' : ''} ${
        isEditing ? 'task-card--editing' : ''
      }`}
    >
      <div className="task-card__main">
        <h3 className="task-card__title">{title}</h3>
        <p className="task-card__meta">
          <span>
            {course} &middot; Deadline {formatDeadline(deadline)}
          </span>
          {deadlineStatus.label && (
            <span className={`deadline-tag deadline-tag--${deadlineStatus.key}`}>
              {deadlineStatus.label}
            </span>
          )}
        </p>

        <div className="task-card__actions">
          {confirming ? (
            <div className="task-card__confirm" role="group" aria-label="Konfirmasi hapus tugas">
              <span className="task-card__confirm-text">Hapus tugas ini?</span>
              <button
                type="button"
                ref={confirmRef}
                className="text-btn text-btn--strong"
                onClick={() => onDelete(id)}
              >
                Ya, hapus
              </button>
              <button
                type="button"
                className="text-btn"
                onClick={() => setConfirming(false)}
              >
                Batal
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="text-btn"
                onClick={() => onEdit(id)}
                aria-label={`Edit ${title}`}
              >
                <PencilIcon />
                Edit
              </button>
              <button
                type="button"
                className="text-btn text-btn--danger"
                onClick={() => setConfirming(true)}
                aria-label={`Hapus ${title}`}
              >
                <TrashIcon />
                Hapus
              </button>
            </>
          )}
        </div>
      </div>

      <div className="task-card__side">
        <span className={`badge ${PRIORITY_CLASS[priority] ?? 'badge--medium'}`}>
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
