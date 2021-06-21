const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use('/api/genres', genres);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));