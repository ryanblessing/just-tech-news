const router = require('express').Router();
const { Post, User } = require('../../models');

//get all users
router.get('/', (request, response) => {
    console.log('=================');
    Post.findAll({
        //query configuration
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
            model: User, 
            attributes: ['username']
            }
        ]
    })
    .then(dbPostData => response.json(dbPostData))
    .catch(err => {
        console.log(err);
        response.status(500).json(err);

    })
});

module.exports = router;