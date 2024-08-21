const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./databse');

const app = express();
const frontendPath = path.join(__dirname, '../frontend/build');

// Middleware für JSON-Parsing
app.use(express.json());

// CORS aktivieren
app.use(cors());

// CRUD-Routen für Produkte
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.post('/api/products', (req, res) => {
  const { item, preis, typ } = req.body;
  db.run('INSERT INTO products (item, preis, typ) VALUES (?, ?, ?)',
    [item, preis, typ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const { item, preis, typ } = req.body;
  db.run('UPDATE products SET item = ?, preis = ?, typ = ? WHERE id = ?',
    [item, preis, typ, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Statische Dateien aus dem Frontend-Build-Ordner servieren, wenn vorhanden
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  // Alle anderen Routen zu index.html umleiten
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  console.log('Frontend build folder not found.');
}

// Server starten
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
