const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');
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

// USER/POST ASSOCIATION WITH VOTE
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
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

module.exports = { User, Post, Comment, Vote, Produce, TrackedProduce };
