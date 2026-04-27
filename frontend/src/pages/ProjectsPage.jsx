import { useState, useEffect } from 'react'
import { getProjects, createProject } from '../api.js'
import styles from './Page.module.css'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then(data => { setProjects(data); setLoading(false) })
  }, [])

  async function handleCreate(e) {
    e.preventDefault()
    if (!name.trim()) return
    const p = await createProject({ name, description })
    setProjects(prev => [...prev, p])
    setName(''); setDescription('')
  }

  return (
    <div>
      <h1 className={styles.heading}>Projects</h1>

      <form className={styles.form} onSubmit={handleCreate}>
        <input
          className={styles.input}
          placeholder="Project name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className={styles.btn} type="submit">Add Project</button>
      </form>

      {loading ? <p className={styles.muted}>Loading...</p> : (
        <div className={styles.grid}>
          {projects.map(p => (
            <div key={p.id} className={styles.card}>
              <span className={styles.cardId}>#{p.id}</span>
              <h2 className={styles.cardTitle}>{p.name}</h2>
              {p.description && <p className={styles.cardDesc}>{p.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
