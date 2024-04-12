require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const recipeRoutes = require('./api/routes');

const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(bodyParser.json());
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
