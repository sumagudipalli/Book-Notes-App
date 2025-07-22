
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const port = 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route - show all books
app.get('/', async (req, res) => {
  const sort = req.query.sort;
  let sortBy = 'date_read DESC';
  if (sort === 'rating') sortBy = 'rating DESC';
  if (sort === 'title') sortBy = 'title ASC';

  try {
    const result = await pool.query(`SELECT * FROM books ORDER BY ${sortBy}`);
    res.render('index', { books: result.rows });
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.send('Error fetching books');
  }
});

// Show form to add a book
app.get('/books/new', (req, res) => {
  res.render('new');
});

// Add new book
app.post('/books', async (req, res) => {
  const { title, author, isbn, cover_url, rating, review, date_read } = req.body;
  try {
    await pool.query(
      'INSERT INTO books (title, author, isbn, cover_url, rating, review, date_read) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [title, author, isbn, cover_url, rating, review, date_read]
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.send('Error adding book');
  }
});

// Show form to edit a book
app.get('/books/:id/edit', async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
    res.render('edit', { book: result.rows[0] });
  } catch (err) {
    console.error('Error fetching book:', err.message);
    res.send('Error fetching book');
  }
});

// Update book
app.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, isbn, cover_url, rating, review, date_read } = req.body;
  try {
    await pool.query(
      'UPDATE books SET title=$1, author=$2, isbn=$3, cover_url=$4, rating=$5, review=$6, date_read=$7 WHERE id=$8',
      [title, author, isbn, cover_url, rating, review, date_read, bookId]
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.send('Error updating book');
  }
});

// Delete book
app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [bookId]);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.send('Error deleting book');
  }
});

// Start server
app.listen(port, () => {
  console.log(`📚 Server running on http://localhost:${port}`);
});
