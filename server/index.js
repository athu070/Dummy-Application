const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// In-memory data store
let todos = [];
let nextId = 1;

// GET /todos - Retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos - Add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const newTodo = {
    id: nextId++,
    text,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update todo status
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const todoIndex = todos.findIndex(t => t.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex].completed = completed !== undefined ? completed : todos[todoIndex].completed;
  res.json(todos[todoIndex]);
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
