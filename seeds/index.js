const sequelize = require("../config/connection");

const seedAll = async() => {
    await sequelize.sync({force: true});

    await seedPages();

    process.exit(0);
};

seedAll();