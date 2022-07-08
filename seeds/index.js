const sequelize = require("../config/connection");
const seedComments = require("./commentTest");
const seedPosts = require("./postsTest");

const seedAll = async() => {
    await sequelize.sync();

    await seedPosts();

    await seedComments();

    process.exit(0);
};

seedAll();