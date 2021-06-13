const express = require('express');
const router = express.Router();

// stored data
const genres = [
    {   id: 1,  name: 'Thriller' },
    {   id: 2,  name: 'Comedy'  },
    {   id: 3,  name: 'Adventure'   }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.filter(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");
    res.send(genre);
});

// Post request.
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Not found");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    genre.name = req.body.name;
    res.send(genre);
});

// Delete.
router.delete('/:id', (req, res) => {
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

module.exports = router;