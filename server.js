const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();

app.use(bodyParser.json());

// stored data
const genres = [
    {
        id: 1,
        name: 'Thriller'
    },
    {
        id: 2,
        name: 'Comedy'
    },
    {
        id: 3,
        name: 'Adventure'
    }
];

// Get request.
app.get('/', (req, res) => {
    res.send("Welcome");
}); // Home request.

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.filter(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");
    res.send(genre);
});

// Post request.
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

// put request.
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    genre.name = req.body.name;
    res.send(genre);
});

// Delete.
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genres);
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });

    return schema.validate(genre);
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));