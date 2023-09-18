const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());


// Gunakan routes/api.js
app.use('/', apiRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});