const MS_PER_DAY = 24 * 60 * 60 * 1000

// Parse "YYYY-MM-DD" sebagai tanggal lokal (bukan UTC) supaya tidak geser sehari.
export function parseDeadline(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? null : date
}

function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

// FR-03: setiap tugas punya satu label deadline.
export function getDeadlineStatus(value) {
  const date = parseDeadline(value)
  if (!date) return { key: 'none', label: '' }

  const diffInDays = Math.round((date - startOfToday()) / MS_PER_DAY)
  if (diffInDays < 0) return { key: 'overdue', label: 'Terlambat' }
  if (diffInDays === 0) return { key: 'today', label: 'Hari ini' }
  return { key: 'upcoming', label: 'Mendatang' }
}

export function formatDeadline(value) {
  const date = parseDeadline(value)
  if (!date) return value
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
