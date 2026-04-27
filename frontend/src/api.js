const BASE = '/api'

export async function getProjects() {
  const res = await fetch(`${BASE}/projects/`)
  return res.json()
}

export async function createProject(data) {
  const res = await fetch(`${BASE}/projects/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function getTasks(projectId) {
  const url = projectId ? `${BASE}/tasks/?project_id=${projectId}` : `${BASE}/tasks/`
  const res = await fetch(url)
  return res.json()
}

export async function createTask(data) {
  const res = await fetch(`${BASE}/tasks/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateTaskStatus(taskId, status) {
  const res = await fetch(`${BASE}/tasks/${taskId}/status?status=${status}`, {
    method: 'PATCH'
  })
  return res.json()
}

export async function getUsers() {
  const res = await fetch(`${BASE}/users/`)
  return res.json()
}
