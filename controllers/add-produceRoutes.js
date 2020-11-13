const router = require('express').Router();
const moment = require('moment');
const sequelize = require('../config/connection');
const { Produce, User } = require('../models');

router.get('/', (req, res) => {
    Produce.findAll({
        include: [
            {
                model: User,
                as: 'user_produce',
                through: {
                    attributes: []
                }
            }
        ]
    })
    .then(dbProduceData => {
        const produce = dbProduceData.map(produce => produce.get({ plain: true }));

        res.render('add-produce', { produce, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;