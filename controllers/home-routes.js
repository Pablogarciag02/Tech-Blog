const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");

//Gets all posts from all users and displays them in the homepage
router.get("/", (req, res) => {
    Posts.findAll({
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                model: Comments,
                attributes: [
                    "id", "comment", "post_id", "user_id", "created_at"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User, 
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//Route for users who are not logged in
router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login")
})

//Gets an individual post by its id
router.get("/post/:id", (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "content",
            "created_at"
        ],
        include: [
            {
                model: Comments,
                attributes: ["id", "comment", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: "No post found"});
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render("individual", {post, loggedIn: req.session.loggedIn})

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;