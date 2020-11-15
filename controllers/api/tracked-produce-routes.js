const router = require('express').Router();
const { TrackedProduce } = require('../../models');

// POST a user's tracked produce item
router.post('/', (req, res) => {
    TrackedProduce.create({
        user_id: req.session.user_id,
        produce_id: req.body.produce_id
    })
    .then(dbTrackedProduceData => {
        res.json(dbTrackedProduceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE a user's tracked produce item
router.delete('/:id', (req, res) => {
    TrackedProduce.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTrackedProduceData => res.json(dbTrackedProduceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;