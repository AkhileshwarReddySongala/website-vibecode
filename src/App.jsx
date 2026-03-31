import { useState, useEffect } from 'react';
import './index.css';

function App() {
  // State Initialization with Local Storage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('daily-tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Personal');
  const [deleteInput, setDeleteInput] = useState('');

  const categories = ['Work', 'Personal', 'Health', 'Other'];

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem('daily-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      category: newTaskCategory,
      completed: false,
      createdAt: Date.now()
    };
    
    setTasks(prev => [newTask, ...prev]);
    setNewTaskText('');
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleClearAll = () => {
    if (deleteInput === 'DELETE') {
      setTasks([]);
      setDeleteInput('');
    }
  };

  const getCategoryColorClass = (cat) => {
    return `cat-${cat.toLowerCase()}`;
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Daily Tasks</h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <form className="task-form" onSubmit={addTask}>
        <div className="input-group">
          <input 
            type="text" 
            className="task-input" 
            placeholder="What needs to be done today?" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
        </div>
        <div className="input-group">
          <select 
            className="category-select" 
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit" className="add-btn">Add Task</button>
        </div>
      </form>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-state">
            <span className="empty-state-icon">✨</span>
            <p>You're all caught up! Enjoy your day.</p>
          </li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-checkbox-container">
                <input 
                  type="checkbox" 
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
              </div>
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                <span className={`task-category ${getCategoryColorClass(task.category)}`}>
                  {task.category}
                </span>
              </div>
              <button 
                className="delete-task-btn" 
                onClick={() => deleteTask(task.id)}
                aria-label="Delete Task"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      {tasks.length > 0 && (
        <div className="clear-section">
          <span className="danger-zone-title">⚠️ Danger Zone</span>
          <div className="clear-input-group">
            <input 
              type="text" 
              className="clear-input" 
              placeholder="Type 'DELETE' to clear all" 
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
            />
            <button 
              className="clear-btn" 
              onClick={handleClearAll}
              disabled={deleteInput !== 'DELETE'}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
