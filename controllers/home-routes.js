const router = require('express').Router();

router.get('/', (request, response) => {
    response.render('homepage');
});

module.exports = router;