const router = require('express').Router();
const moment = require('moment');
const sequelize = require('../config/connection');
const { User, Post, Comment, Produce, TrackedProduce } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'created_at']
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

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

        console.log({ posts, week, loggedIn: true });

        res.render('dashboard', { posts, week, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;