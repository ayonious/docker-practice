const express = require('express');
const app = express();

const SPRINGBOOT_SERVICE_URL = process.env.SPRINGBOOT_SERVICE_URL || 'http://springboot-service:8080';

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];
  res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  const user = users.find(u => u.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name,
    email
  };

  res.status(201).json(newUser);
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(`${SPRINGBOOT_SERVICE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`Spring Boot service responded with status: ${response.status}`);
    }
    const products = await response.json();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products from Spring Boot service', details: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await fetch(`${SPRINGBOOT_SERVICE_URL}/api/products/${productId}`);

    if (response.status === 404) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!response.ok) {
      throw new Error(`Spring Boot service responded with status: ${response.status}`);
    }

    const product = await response.json();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product from Spring Boot service', details: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const response = await fetch(`${SPRINGBOOT_SERVICE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Spring Boot service responded with status: ${response.status}`);
    }

    const product = await response.json();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product in Spring Boot service', details: error.message });
  }
});

module.exports = app;
