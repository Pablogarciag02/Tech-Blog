const { Pages, Posts } = require("../models");

const postData =[
    { 
        title: "¿Porque Abba es una de las mejores bandas?",
        content: "Abba es una banda que origina de suecia, ellos ahora ya estan viejos. Sin embargo su musica es inolvidable. Cabe recalcar tambien, que hacen conciertos en los cuales puedes ver a los cantantes cuando ellos estaban joves gracias a technologia holograma; lo cual los hace innovadores y muy exitosos.",
        user_id: 1,
    }
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;