const router = require('express').Router();
const moment = require('moment');
const sequelize = require('../config/connection');
const { User, Post, Comment, Produce, TrackedProduce } = require('../models');

router.get('/', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Produce,
                as: 'user_produce',
                through: {
                    attributes: []
                }
            },
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE id = vote.post_id)'), 'vote_count']
                ], 
                include: {
                    model: Comment
                }
            }
        ],
    })
    .then(dbPostData => {
        const userData = dbPostData.get({ plain: true });

        let week = [];

        for (i = 0; i < 7; i++) {
            let day = {
                date: moment().date() + i,
                dayOfWeek: moment().add(i, 'days').format('dddd'),
                month: moment().format('MMMM'),
                year: moment().format('YYYY')
            };

            week.push(day);
        };

        res.render('dashboard', { 
            produce: userData.user_produce,
            posts: userData.posts,
            week,
            loggedIn: true 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit-post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        const userData = dbPostData.get({ plain: true });

        console.log(userData);

        res.render('edit-post', {
            post: userData,
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
