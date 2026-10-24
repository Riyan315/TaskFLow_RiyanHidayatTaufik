import { useMemo, useState } from 'react'
import TaskList from '../components/TaskList'
import {
  DAY_LABELS,
  buildMonthGrid,
  formatLongDate,
  formatMonthLabel,
  getMonthKey,
  toDateKey,
} from '../utils/calendar'

function CalendarView({
  tasks,
  editingId,
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
}) {
  const today = new Date()
  const todayKey = toDateKey(today)

  const [cursor, setCursor] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })
  const [selectedKey, setSelectedKey] = useState(todayKey)

  // Kelompokkan tugas per tanggal deadline ("YYYY-MM-DD").
  const tasksByDate = useMemo(() => {
    const map = new Map()
    tasks.forEach((task) => {
      if (!task.deadline) return
      const dayTasks = map.get(task.deadline) ?? []
      dayTasks.push(task)
      map.set(task.deadline, dayTasks)
    })
    return map
  }, [tasks])

  const weeks = useMemo(
    () => buildMonthGrid(cursor.year, cursor.month),
    [cursor],
  )

  const monthPrefix = getMonthKey(cursor.year, cursor.month)
  const monthTaskCount = tasks.filter((task) =>
    task.deadline?.startsWith(monthPrefix),
  ).length

  const changeMonth = (delta) => {
    setCursor(({ year, month }) => {
      const next = new Date(year, month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
    setSelectedKey(null)
  }

  const goToToday = () => {
    setCursor({ year: today.getFullYear(), month: today.getMonth() })
    setSelectedKey(todayKey)
  }

  const selectedTasks = selectedKey ? tasksByDate.get(selectedKey) ?? [] : []

  return (
    <section className="panel" aria-labelledby="calendar-title">
      <div className="calendar__header">
        <div>
          <h2 id="calendar-title" className="panel__title">Kalender deadline</h2>
          <p className="panel__subtitle">
            {monthTaskCount > 0
              ? `${monthTaskCount} tugas punya deadline di bulan ini.`
              : 'Tidak ada deadline di bulan ini.'}
          </p>
        </div>

        <div className="calendar__nav">
          <button
            type="button"
            className="calendar__nav-btn"
            aria-label="Bulan sebelumnya"
            onClick={() => changeMonth(-1)}
          >
            &larr;
          </button>
          <p className="calendar__month" aria-live="polite">
            {formatMonthLabel(cursor.year, cursor.month)}
          </p>
          <button
            type="button"
            className="calendar__nav-btn"
            aria-label="Bulan berikutnya"
            onClick={() => changeMonth(1)}
          >
            &rarr;
          </button>
          <button type="button" className="text-btn" onClick={goToToday}>
            Hari ini
          </button>
        </div>
      </div>

      <div className="calendar__weekdays" aria-hidden="true">
        {DAY_LABELS.map((label) => (
          <span key={label} className="calendar__weekday">
            {label}
          </span>
        ))}
      </div>

      <div
        className="calendar__grid"
        role="group"
        aria-label={`Kalender ${formatMonthLabel(cursor.year, cursor.month)}`}
      >
        {weeks.map((week) =>
          week.map((date) => {
            const key = toDateKey(date)

            if (date.getMonth() !== cursor.month) {
              return (
                <span
                  key={key}
                  className="cal-day cal-day--empty"
                  aria-hidden="true"
                />
              )
            }

            const dayTasks = tasksByDate.get(key) ?? []
            const isToday = key === todayKey
            const isSelected = key === selectedKey
            const label = [
              formatLongDate(key),
              isToday ? 'hari ini' : null,
              dayTasks.length > 0
                ? `${dayTasks.length} tugas`
                : 'tidak ada tugas',
            ]
              .filter(Boolean)
              .join(', ')

            return (
              <button
                key={key}
                type="button"
                className={`cal-day ${isToday ? 'cal-day--today' : ''} ${
                  isSelected ? 'cal-day--selected' : ''
                }`}
                onClick={() => setSelectedKey(key)}
                aria-pressed={isSelected}
                aria-label={label}
              >
                <span className="cal-day__num">{date.getDate()}</span>

                {dayTasks.length > 0 && (
                  <>
                    <span className="cal-day__tasks" aria-hidden="true">
                      {dayTasks.slice(0, 2).map((task) => (
                        <span
                          key={task.id}
                          className={`cal-chip ${
                            task.completed ? 'cal-chip--done' : ''
                          }`}
                        >
                          {task.title}
                        </span>
                      ))}
                      {dayTasks.length > 2 && (
                        <span className="cal-chip cal-chip--more">
                          +{dayTasks.length - 2} lagi
                        </span>
                      )}
                    </span>
                    <span className="cal-day__dots" aria-hidden="true">
                      {dayTasks.slice(0, 3).map((task) => (
                        <span
                          key={task.id}
                          className={`cal-dot ${
                            task.completed ? 'cal-dot--done' : ''
                          }`}
                        />
                      ))}
                    </span>
                  </>
                )}
              </button>
            )
          }),
        )}
      </div>

      {selectedKey ? (
        <div className="calendar__detail">
          <h3 className="calendar__detail-title">{formatLongDate(selectedKey)}</h3>
          {selectedTasks.length > 0 ? (
            <TaskList
              tasks={selectedTasks}
              hasAnyTask
              editingId={editingId}
              onUpdateStatus={onUpdateStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ) : (
            <p className="calendar__detail-empty">
              Tidak ada tugas dengan deadline di tanggal ini.
            </p>
          )}
        </div>
      ) : (
        <p className="calendar__detail-empty">
          Pilih salah satu tanggal untuk melihat daftar tugasnya.
        </p>
      )}
    </section>
  )
}

export default CalendarView
