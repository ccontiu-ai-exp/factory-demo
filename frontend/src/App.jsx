import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import ProjectsPage from './pages/ProjectsPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import styles from './App.module.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <nav className={styles.nav}>
          <span className={styles.logo}>TeamBoard</span>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Projects</NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : ''}>Tasks</NavLink>
        </nav>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
