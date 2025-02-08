const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});