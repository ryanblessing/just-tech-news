const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((request, response) => {
  response.status(404).end();
});

module.exports = router;