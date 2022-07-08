const { Pages, Comments } = require("../models");

const commentData =[
    { 
        comment: "Your opinion about this band is very true!... Actually i believe you are right",
        post_id: 1,
        user_id: 1,
    },
    {
        comment: "This should appearr",
        post_id: 1,
        user_id: 2,
    },
    

];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;


