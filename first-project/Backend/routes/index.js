const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Ein Hallo vom Router Ordner. Mit /home kommst du auf die Produktverwaltung');
});

router.get('/home', (req, res, next) => {
    res.render('home', null);
});

router.get('/json', (req, res, next) => {
    const data = {
        name: 'Erkan',
        greeting: 'Hello Erkan',
        age: 33,
        hobbies: ['Sports', 'Coding', 'Watching Anime']
    }
    res.json(data);
});

module.exports = router;