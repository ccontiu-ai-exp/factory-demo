import { useState, useEffect } from 'react'
import { getTasks, createTask, getProjects, updateTaskStatus } from '../api.js'
import styles from './Page.module.css'

const STATUS_COLORS = {
  todo: 'var(--muted)',
  in_progress: 'var(--yellow)',
  done: 'var(--green)'
}

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [projectId, setProjectId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTasks(), getProjects()]).then(([t, p]) => {
      setTasks(t); setProjects(p)
      if (p.length) setProjectId(String(p[0].id))
      setLoading(false)
    })
  }, [])

  async function handleCreate(e) {
    e.preventDefault()
    if (!title.trim() || !projectId) return
    const t = await createTask({ title, project_id: parseInt(projectId) })
    setTasks(prev => [...prev, t])
    setTitle('')
  }

  async function handleStatus(taskId, status) {
    const updated = await updateTaskStatus(taskId, status)
    setTasks(prev => prev.map(t => t.id === taskId ? updated : t))
  }

  const projectName = (id) => projects.find(p => p.id === id)?.name ?? `#${id}`

  return (
    <div>
      <h1 className={styles.heading}>Tasks</h1>

      <form className={styles.form} onSubmit={handleCreate}>
        <input
          className={styles.input}
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <select
          className={styles.input}
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
        >
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button className={styles.btn} type="submit">Add Task</button>
      </form>

      {loading ? <p className={styles.muted}>Loading...</p> : (
        <div className={styles.taskList}>
          {tasks.map(t => (
            <div key={t.id} className={styles.taskRow}>
              <div>
                <span className={styles.taskTitle}>{t.title}</span>
                <span className={styles.taskProject}>{projectName(t.project_id)}</span>
              </div>
              <select
                className={styles.statusSelect}
                value={t.status}
                style={{ color: STATUS_COLORS[t.status] }}
                onChange={e => handleStatus(t.id, e.target.value)}
              >
                <option value="todo">todo</option>
                <option value="in_progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
