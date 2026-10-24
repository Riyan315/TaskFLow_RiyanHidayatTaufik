const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua status' },
  { value: 'pending', label: 'Belum selesai' },
  { value: 'done', label: 'Selesai' },
]

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'Semua prioritas' },
  { value: 'Tinggi', label: 'Tinggi' },
  { value: 'Sedang', label: 'Sedang' },
  { value: 'Rendah', label: 'Rendah' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Terbaru ditambahkan' },
  { value: 'deadline-asc', label: 'Deadline terdekat' },
  { value: 'deadline-desc', label: 'Deadline terjauh' },
]

function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sort,
  onSortChange,
  resultCount,
  totalCount,
  isFiltered,
  onReset,
}) {
  return (
    <div className="toolbar">
      <div className="field">
        <label htmlFor="search">Cari tugas</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari judul atau mata kuliah"
        />
      </div>

      <div className="toolbar__filters">
        <div className="field">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="filter-priority">Prioritas</label>
          <select
            id="filter-priority"
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort-by">Urutkan</label>
          <select
            id="sort-by"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="toolbar__meta">
        <p className="toolbar__count" aria-live="polite">
          Menampilkan {resultCount} dari {totalCount} tugas
        </p>
        {isFiltered && (
          <button type="button" className="text-btn" onClick={onReset}>
            Reset filter
          </button>
        )}
      </div>
    </div>
  )
}

export default Toolbar
