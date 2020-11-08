const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Produce = require('./Produce');
const TrackedProduce = require('./TrackedProduce');

// USER & POST ASSOCIATIONS
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// USER/POST ASSOCIATION WITH COMMENT
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// PRODUCE, TRACKEDPRODUCE, AND USER ASSOCIATIONS
User.belongsToMany(Produce, {
    through: 'tracked_produce',
    as: 'produce',
    foreignKey: 'user_id'
});

Produce.belongsToMany(User, {
    through: 'tracked_produce',
    as: 'produce',
    foreignKey: 'produce_id'
});

module.exports = { User, Post, Comment, Produce, TrackedProduce };