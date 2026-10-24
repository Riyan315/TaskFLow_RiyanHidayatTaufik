export const DAY_LABELS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

// Kunci tanggal lokal "YYYY-MM-DD", sama seperti value input type="date".
export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getMonthKey(year, month) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

export function formatMonthLabel(year, month) {
  return `${MONTH_NAMES[month]} ${year}`
}

export function formatLongDate(key) {
  const [year, month, day] = key.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  if (Number.isNaN(date.getTime())) return key
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Grid minggu yang dimulai hari Senin, hanya baris yang dipakai.
export function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const offset = (firstOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const rows = Math.ceil((offset + daysInMonth) / 7)

  const weeks = []
  const cursor = new Date(year, month, 1 - offset)

  for (let row = 0; row < rows; row += 1) {
    const week = []
    for (let day = 0; day < 7; day += 1) {
      week.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}
