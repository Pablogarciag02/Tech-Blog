const router = require("express").Router();
const { User, Posts } = require("../models");

router.get("/", async(req, res) => {
    res.render("homepage", {
        loggedIn: req.session.loggedIn,
    });
});

router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login")
})

router.get("/", async (req, res) => {
    try {
        const dbPosts = await Posts.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        })

        const users = dbUserData.map((username) => 
            username.get({ plain: true })
        );

        const posts = dbPosts.map((posts) => 
            posts.get({ plain: true })
        );

        console.log(users);
        console.log(posts);
        res.render("homepage", {
            username,
            posts,

        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});

module.exports = router;