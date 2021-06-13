const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home.js');

app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));