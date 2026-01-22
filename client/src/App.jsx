import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

function App() {
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/todos')
            setTodos(response.data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching todos:', err)
            setError('Failed to load todos. Make sure the server is running.')
            setLoading(false)
        }
    }

    const addTodo = async (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        try {
            const response = await axios.post('/todos', { text: inputValue })
            setTodos([...todos, response.data])
            setInputValue('')
        } catch (err) {
            console.error('Error adding todo:', err)
            setError('Failed to add todo.')
        }
    }

    const toggleTodo = async (id, completed) => {
        try {
            const response = await axios.put(`/todos/${id}`, { completed: !completed })
            setTodos(todos.map(todo =>
                todo.id === id ? response.data : todo
            ))
        } catch (err) {
            console.error('Error updating todo:', err)
            setError('Failed to update todo.')
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/todos/${id}`)
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (err) {
            console.error('Error deleting todo:', err)
            setError('Failed to delete todo.')
        }
    }

    return (
        <div className="container">
            <h1>My Tasks</h1>

            <form onSubmit={addTodo} className="add-todo-form">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            {error && <div className="error">{error}</div>}
            {loading ? (
                <div className="loading">Loading tasks...</div>
            ) : (
                <ul className="todo-list">
                    {todos.length === 0 && !error && (
                        <li className="loading" style={{ listStyle: 'none' }}>No tasks yet. Add one above!</li>
                    )}
                    {todos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <div className="todo-content">
                                <label className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id, todo.completed)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-btn"
                                title="Delete task"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App
