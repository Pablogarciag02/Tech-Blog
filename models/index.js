const User = require("./User");
const Posts = require("./Posts");
const Comments = require("./Comments");

//A user can have many posts that are tracked by his id.
User.hasMany(Posts, {
    foreignKey: "user_id",
});

//A user can add as many comments on any post that are tracked by his id.
User.hasMany(Comments, {
    foreignKey: "user_id",
});

//Comments belong to users by their user id
Comments.belongsTo(User, {
    foreignKey: "user_id"
})

//Comments belong to posts by their post id.
Comments.belongsTo(Posts, {
    foreignKey: "post_id"
})

//Any post has many comments, that are added to it thanks to its post_id.
Posts.hasMany(Comments, {
    foreignKey: "user_id"
})

//Posts belong to a user through their id.
Posts.belongsTo(User, {
    foreignKey: "user_id",
});




module.exports = { User, Posts, Comments };