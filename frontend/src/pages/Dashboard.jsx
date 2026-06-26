import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Plus, X, Briefcase, Calendar, CheckCircle2, Circle, User, DollarSign, FileText } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ status: newStatus })
      })
    } catch (err) {
      console.error(err)
      fetchTasks()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setTasks(tasks.filter(t => t.id !== id))
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
    } catch (err) {
      console.error(err)
      fetchTasks()
    }
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending')
  const doneTasks = tasks.filter(t => t.status === 'done')

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Project CRM</h1>
          <p style={{ color: 'var(--white-70)' }}>Welcome back, {user?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={openAddModal} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> New Project
          </button>
          <button onClick={logout} className="btn" style={{ background: 'rgba(255,50,50,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,50,50,0.2)' }}>
            Logout
          </button>
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center', color: 'var(--white-70)', padding: '40px' }}>Loading projects...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* Pending Projects */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Circle size={20} color="#fbbf24" />
              <h3 style={{ fontSize: '1.5rem', color: 'var(--white)' }}>In Progress ({pendingTasks.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pendingTasks.length === 0 && <p style={{ color: 'var(--white-50)', fontStyle: 'italic' }}>No pending projects.</p>}
              {pendingTasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={() => openEditModal(task)} onToggle={() => toggleStatus(task.id, task.status)} onDelete={() => handleDelete(task.id)} />
              ))}
            </div>
          </div>

          {/* Done Projects */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <CheckCircle2 size={20} color="#34d399" />
              <h3 style={{ fontSize: '1.5rem', color: 'var(--white)' }}>Completed ({doneTasks.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {doneTasks.length === 0 && <p style={{ color: 'var(--white-50)', fontStyle: 'italic' }}>No completed projects yet.</p>}
              {doneTasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={() => openEditModal(task)} onToggle={() => toggleStatus(task.id, task.status)} onDelete={() => handleDelete(task.id)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ProjectModal 
          task={editingTask} 
          onClose={() => setIsModalOpen(false)} 
          onSave={() => { setIsModalOpen(false); fetchTasks(); }} 
        />
      )}
    </div>
  )
}

function TaskCard({ task, onEdit, onToggle, onDelete }) {
  const isDone = task.status === 'done'
  const formatCurrency = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val)
  
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ fontSize: '1.25rem', color: isDone ? 'var(--white-50)' : 'var(--white)', textDecoration: isDone ? 'line-through' : 'none', marginBottom: '4px' }}>
            {task.title}
          </h4>
          <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', color: 'var(--white-70)' }}>
            {task.progress || 'Planning'}
          </span>
        </div>
        <button onClick={onEdit} className="btn" style={{ padding: '4px 12px', fontSize: '0.9rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Edit</button>
      </div>
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {task.client_name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>
            <User size={16} /> <span>{task.client_name} {task.client_contact && `(${task.client_contact})`}</span>
          </div>
        )}
        {task.income > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <DollarSign size={16} /> <span>{formatCurrency(task.income)}</span>
          </div>
        )}
        {task.deadline && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.9rem' }}>
            <Calendar size={16} /> <span>{new Date(task.deadline).toLocaleDateString()}</span>
          </div>
        )}
        {task.requirements && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--white-70)', fontSize: '0.9rem', marginTop: '8px' }}>
            <FileText size={16} style={{ marginTop: '2px', flexShrink: 0 }} /> <p style={{ margin: 0, lineHeight: 1.4 }}>{task.requirements}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={onToggle} style={{ flex: 1, padding: '12px', background: isDone ? 'rgba(255,255,255,0.05)' : 'rgba(52, 211, 153, 0.1)', color: isDone ? 'var(--white)' : '#34d399', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
          {isDone ? 'Mark Undone' : 'Mark Done'}
        </button>
        <button onClick={onDelete} style={{ padding: '12px 24px', background: 'rgba(255,50,50,0.05)', color: '#ff6b6b', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
    </div>
  )
}

function ProjectModal({ task, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    url: task?.url || '',
    client_name: task?.client_name || '',
    client_contact: task?.client_contact || '',
    progress: task?.progress || 'Planning',
    income: task?.income || '',
    requirements: task?.requirements || '',
    report: task?.report || '',
    deadline: task?.deadline || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const url = task ? `/api/tasks/${task.id}` : '/api/tasks'
    const method = task ? 'PUT' : 'POST'
    
    // Clean up empty fields
    const data = { ...formData }
    if (!data.income) data.income = 0

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        onSave()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', width: '100%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: 'var(--white)', margin: 0 }}>{task ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--white-50)', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto' }}>
          <form id="project-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Project Name *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="contact__input" required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Client Name</label>
              <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} className="contact__input" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Client Contact</label>
              <input type="text" name="client_contact" value={formData.client_contact} onChange={handleChange} className="contact__input" placeholder="Email / WA" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Income (Rp)</label>
              <input type="number" name="income" value={formData.income} onChange={handleChange} className="contact__input" placeholder="0" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="contact__input" style={{ colorScheme: 'dark' }} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Progress Phase</label>
              <select name="progress" value={formData.progress} onChange={handleChange} className="contact__input" style={{ appearance: 'none' }}>
                <option value="Planning">Planning</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Deployment">Deployment</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Requirements / Scope</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} className="contact__input" rows="3" placeholder="What needs to be done?"></textarea>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--white-70)', fontSize: '0.9rem' }}>Project Notes / Report</label>
              <textarea name="report" value={formData.report} onChange={handleChange} className="contact__input" rows="3" placeholder="Progress notes or final report..."></textarea>
            </div>

          </form>
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <button type="button" onClick={onClose} className="btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Cancel</button>
          <button type="submit" form="project-form" className="btn btn--primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>

      </div>
    </div>
  )
}
