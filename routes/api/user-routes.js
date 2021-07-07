const router = require('express').Router();
const {User} = require('../../models');

//GET/api/users
router.get('/', (request, response) => {
    //access our User Model and run .findAll() method)
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(dbUserData => response.json(dbUserData))
        .catch(err => {
            console.log(err);
            response.status(500).json(err);
        });
});;

//GET/api/user/1
router.get('/:id', (request, response) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: request.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                response.status(404).json({
                    message: 'No User found with this ID'
                });
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
            username: request.body.username, //'Lernantino',
            email: request.body.email, //'lernantino@gmail.com', 
            password: request.body.password //'password1234' 
        })
        .then(dbUserData => response.json(dbUserData))
        .catch(err => {
            console.log(err);
            response.status(500).json(err);
        });
});

router.post('/login', (request, response) => {
    // Query Operation
    //expects username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'
    User.findOne({
            where: {
                email: request.body.email
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                response.status(400).json({
                    message: 'No user with that email address!'
                });
                return;
            }
            //Verify User
            const validPassword = dbUserData.checkPassword(request.body.password);
            //this returns a boolean so this additional statement below is needed to handle either true or false
            if (!validPassword) {
                response.status(400).json({
                    message: 'Incorrect password!'
                });
                return;
            }

            response.json({
                user: dbUserData,
                message: ' You are now logged in!'
            });
        });
});

//Put/api/user/1
router.put('/:1', (request, response) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(request.body, {
            //updated to use to updated hook!
            individualHooks: true,
            where: {
                id: request.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                response.status(404).json({
                    message: 'No User Found With This Id'
                });
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
            if (!dbUserData) {
                response.status(404).json({
                    message: 'No user found with this ID'
                })
            }
            response.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err);
        });
});

module.exports = router;