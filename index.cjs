// index.js (or rename to index.cjs)
require('dotenv').config();
const express = require('express');
const app = express();
const { createClient } = require('redis');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
// const { Model } = require('objection');
// const Knex = require('knex');
const { development } = require('./backend/knexfile');



// Initialize Knex + Objection
// const knex = require('knex')(require('../knexfile')[env]);
// Model.knex(knex);

// Redis Client
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.log('Redis Error:', err));
redisClient.connect();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Server is running!'));
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', redis: redisClient.isOpen });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});