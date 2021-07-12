const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');

// get all users
router.get('/', (request, response) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
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
    });
});

router.get('/:id', (request, response) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        response.status(404).json({ message: 'No post found with this id' });
        return;
      }
      response.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.post('/', (request, response) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: request.body.title,
    post_url: request.body.post_url,
    user_id: request.body.user_id
  })
    .then(dbPostData => response.json(dbPostData))
    .catch(err => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.put('/upvote', (request, response) => {
  // custom static method created in models/Post.js
  Post.upvote(request.body, { Vote, Comment, User })
    .then(updatedVoteData => response.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.put('/:id', (request, response) => {
  Post.update(
    {
      title: request.body.title
    },
    {
      where: {
        id: request.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        response.status(404).json({ message: 'No post found with this id' });
        return;
      }
      response.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.delete('/:id', (request, response) => {
  Post.destroy({
    where: {
      id: request.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        response.status(404).json({ message: 'No post found with this id' });
        return;
      }
      response.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json(err);
    });
});

module.exports = router;
