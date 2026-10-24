function EmptyState({
  title = 'Belum ada data tugas.',
  text = 'Isi formulir untuk menambahkan tugas pertama kamu.',
}) {
  return (
    <div className="empty-state">
      <svg
        className="empty-state__icon"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__text">{text}</p>
    </div>
  )
}

export default EmptyState
