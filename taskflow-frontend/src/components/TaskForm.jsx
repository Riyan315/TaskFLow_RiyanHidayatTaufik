import { useState } from 'react'

const PRIORITIES = ['Rendah', 'Sedang', 'Tinggi']

const INITIAL_FORM = {
  title: '',
  course: '',
  deadline: '',
  priority: 'Sedang',
}

function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // FR-07: tolak field kosong atau hanya spasi
  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Judul tugas wajib diisi.'
    if (!form.course.trim()) next.course = 'Mata kuliah wajib diisi.'
    if (!form.deadline.trim()) next.deadline = 'Deadline wajib diisi.'
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAddTask({
      title: form.title.trim(),
      course: form.course.trim(),
      deadline: form.deadline,
      priority: form.priority,
    })
    setForm(INITIAL_FORM)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Judul tugas</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Contoh: Laporan praktikum React"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p className="field__error" id="title-error">{errors.title}</p>}
      </div>

      <div className="field">
        <label htmlFor="course">Mata kuliah</label>
        <input
          id="course"
          name="course"
          type="text"
          value={form.course}
          onChange={handleChange}
          placeholder="Contoh: Pemrograman Web"
          aria-invalid={Boolean(errors.course)}
          aria-describedby={errors.course ? 'course-error' : undefined}
        />
        {errors.course && <p className="field__error" id="course-error">{errors.course}</p>}
      </div>

      <div className="field">
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          aria-invalid={Boolean(errors.deadline)}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
        />
        {errors.deadline && <p className="field__error" id="deadline-error">{errors.deadline}</p>}
      </div>

      <div className="field">
        <label htmlFor="priority">Prioritas</label>
        <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
          {PRIORITIES.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn--primary">Tambah tugas</button>
    </form>
  )
}

export default TaskForm
