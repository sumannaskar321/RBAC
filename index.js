require('dotenv').config();
const { connectDB } = require('./config/db');
const apiRouter = require('./routes');


const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

// Mount the versioned API
app.use('/api', apiRouter);

// Fallback 404 for Unhandled API versions/routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Endpoint or API version not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running @ ${PORT}`);
    connectDB();
})