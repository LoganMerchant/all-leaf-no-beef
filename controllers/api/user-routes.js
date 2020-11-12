const router = require('express').Router();
const { User, Post, Comment, Vote, Produce, TrackedProduce } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500);
    });
});

// GET user's produce to be watered daily
router.get('/daily-produce', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        include: {
            model: Produce,
            as: 'user_produce',
            through: {
                attributes: []
            },
            where: {
                water_frequency: 'daily'
            }
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET user's produce to be watered bi-weekly
router.get('/bi-weekly-produce', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        include: {
            model: Produce,
            as: 'user_produce',
            through: {
                attributes: []
            },
            where: {
                water_frequency: 'bi-weekly'
            }
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            // declare session variables
            req.session.user_id= dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn= true;

            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST ROUTE FOR LOGIN
router.post('/login', (req, res) => {
    console.log('======================');
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // declare session variables
            req.session.user_id= dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn= true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        })
    })
})

// PUT /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;