const router = require('express').Router();
const { User } = require('../../models');

//GET/api/users
router.get('/', (request, response) => {
    //access our User Model and run .findAll() method)
    User.findAll()
    .then(dbUserData => response.json(dbUserData))
    .catch(err => {
        console.log(err);
        response.status(500).json(err);
    });
});;

//GET/api/user/1
router.get('/:id', (request, response) => {
    User.findOne({
        where: {
            id: request.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            response.status(404).json({ message: 'No User found with this ID' });
            return;
        }
        response.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err);
    });
});

//Post/api/user
router.post('/', (request, response) => {
    //expects username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'
    User.create({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    })
    .then(dbUserData => response.json(dbUserData))
    .catch(err => {
        console.log(err);
        response.status(500).json(err);
    });
});

//Put/api/user/1
router.put('/:1', (request, response) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(request.body, {
        where: {
            id: request.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            response.status(404).json({ message: 'No User Found With This Id' });
            return;
        }
        response.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err);
    });
});

//Delete/api/user/1
router.delete('/:1', (request, response) => {
    User.destroy({
        where: {
            id: request.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            response.status(404).json({ message: 'No user found with this ID' })
        }
        response.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err);
    });
});

module.exports = router;