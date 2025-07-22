require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "0735211299",
    cover_url: "https://covers.openlibrary.org/b/isbn/0735211299-M.jpg",
    rating: 5,
    review: "A powerful guide on building good habits and breaking bad ones using tiny behavioral changes.",
    date_read: "2024-06-15"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "1455586692",
    cover_url: "https://covers.openlibrary.org/b/isbn/1455586692-M.jpg",
    rating: 4,
    review: "A compelling argument for the importance of focused work and how to achieve it in a distracted world.",
    date_read: "2024-04-10"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    isbn: "0857197681",
    cover_url: "https://covers.openlibrary.org/b/isbn/0857197681-M.jpg",
    rating: 5,
    review: "Insights into how emotions and biases influence financial decisions more than logic.",
    date_read: "2024-03-05"
  },
  {
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    isbn: "0143130722",
    cover_url: "https://covers.openlibrary.org/b/isbn/0143130722-M.jpg",
    rating: 4,
    review: "A Japanese concept that helps you find purpose and joy in your daily life.",
    date_read: "2024-01-22"
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    isbn: "1591846447",
    cover_url: "https://covers.openlibrary.org/b/isbn/1591846447-M.jpg",
    rating: 4,
    review: "A guide to inspiring leadership and innovation by discovering your purpose—the 'why'.",
    date_read: "2023-12-30"
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    isbn: "1544512287",
    cover_url: "https://covers.openlibrary.org/b/isbn/1544512287-M.jpg",
    rating: 5,
    review: "A powerful memoir of mental toughness and resilience from a Navy SEAL turned endurance athlete.",
    date_read: "2024-02-18"
  },{
    title: "Make Your Bed",
    author: "William H. McRaven",
    isbn: "1455570249",
    cover_url: "https://covers.openlibrary.org/b/isbn/1455570249-M.jpg",
    rating: 4,
    review: "Simple but life-changing lessons from a Navy Admiral’s speech on achieving success.",
    date_read: "2024-01-08"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    isbn: "1612680194",
    cover_url: "https://covers.openlibrary.org/b/isbn/1612680194-M.jpg",
    rating: 4,
    review: "A classic guide to financial independence and shifting your mindset about money.",
    date_read: "2023-11-20"
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    isbn: "1577314808",
    cover_url: "https://covers.openlibrary.org/b/isbn/1577314808-M.jpg",
    rating: 5,
    review: "A spiritual guide to living fully in the present moment and finding peace.",
    date_read: "2024-03-01"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "0374533555",
    cover_url: "https://covers.openlibrary.org/b/isbn/0374533555-M.jpg",
    rating: 5,
    review: "An exploration of how our minds work, how we think, and the biases that affect our decisions.",
    date_read: "2024-04-12"
  }
];

(async () => {
  for (const book of books) {
    await pool.query(
      'INSERT INTO books (title, author, isbn, cover_url, rating, review, date_read) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [book.title, book.author, book.isbn, book.cover_url, book.rating, book.review, book.date_read]
    );
  }
  console.log("✅ Sample books inserted successfully!");
  await pool.end();
})();
