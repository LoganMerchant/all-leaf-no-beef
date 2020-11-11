const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 2,
        title: 'THIS IS A TEST',
        content: 'LOREM IPSUM LEORI TISKJ TIEUO SKEI TISL QIRU SKVMS',
        vote_count: 12,
        comments: [],
        user: {
            username: 'trevor'
        }
    });
});


module.exports = router;