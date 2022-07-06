const { Pages, Comments } = require("../models");

const commentData =[
    { 
        comment: "Your opinion about this band is very true!... Actually i believe you are right",
        post_id: 1,
        user_id: 1,
    }
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;


