const express = require('express');
const router = express.Router();
const pool = require('../db'); // adjust if needed

router.get('/', async (req, res) => {
  const sort = req.query.sort;
  let sortBy = 'date_read DESC';
  if (sort === 'rating') sortBy = 'rating DESC';
  if (sort === 'title') sortBy = 'title ASC';

  try {
    const result = await pool.query(`SELECT * FROM books ORDER BY ${sortBy}`);
    res.render('index', { books: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Error fetching books');
  }
});

module.exports = router;

