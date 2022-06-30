const sequelize = require("../config/connection");
const seedPosts = require("./postsTest");

const seedAll = async() => {
    await sequelize.sync();

    await seedPosts();

    process.exit(0);
};

seedAll();