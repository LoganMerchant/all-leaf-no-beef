const router = require('express').Router();
const { Produce } = require('../../models');


// GET /api/produce
router.get('/', (req, res) => {
    Produce.findAll({})
    .then(dbProduceData => res.json(dbProduceData))
    .catch(err => {
        console.log(err);
        res.status(500);
    });
});

module.exports = router;