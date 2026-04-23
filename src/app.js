const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const intervalloRoutes = require('./routes/intervalloRoutes');
const obiettivoRoutes = require('./routes/obiettivoRoutes');

app.use('/users', userRoutes);
app.use('/intervals', intervalloRoutes);
app.use('/intervals/:id/goals', obiettivoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});

module.exports = app;