/**
 * Questo è un file speciale per il deploy su StackBlitz
 * Crea un server minimo che può essere usato per testare l'applicazione
 * senza richiedere TypeScript, webpack o altre dipendenze complesse.
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve i file statici dalla directory 'public'
app.use(express.static('public'));

// Aggiungi middleware per il parsing del JSON
app.use(express.json());

// API di esempio per i bookings 
const bookings = [];
let nextId = 1;

// Endpoint API
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.get('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === id);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  res.json(booking);
});

app.post('/api/bookings', (req, res) => {
  const newBooking = {
    id: nextId++,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.patch('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  bookings[index] = {
    ...bookings[index],
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  res.json(bookings[index]);
});

app.delete('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  bookings.splice(index, 1);
  res.status(204).send();
});

// Pagina principale di debug
app.get('/debug-stackblitz', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'stackblitz-debug.html'));
});

// Pagina standalone
app.get('/standalone', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'standalone.html'));
});

// Tutte le altre richieste vengono instradate all'applicazione React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

// Avvia il server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server StackBlitz in esecuzione su http://localhost:${PORT}`);
});