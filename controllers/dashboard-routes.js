const router = require("express").Router();
const { Posts, User, Comments } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

//These are the routes for the dashboard: it requires authentication to show the user his individual posts.

//Get all posts belonging to user who created them
router.get("/", withAuth, (req, res) => {
    Posts.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "content",
            "title",
            "created_at"
        ],
        include:[
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("dashboard", {posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/comments", withAuth, (req, res) => {
    Comments.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "comment",
            "created_at"
        ],
        include:[
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbCommentData => {
        const comments = dbCommentData.map(comments => comments.get({ plain: true }));
        res.render("commentDashboard", {comments, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//gets one individual post so that the user can select to edit, or delete it
router.get("/edit/:id", withAuth, (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
        {
            model: User,
            attributes: ["username"]
        },
        {
            model: Comments,
            attributes: ["id", "comment", "post_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ["username"],
            }
        }
        ]
    })
    .then(dbPostData => {
        const post = dbPostData.get({ plain: true });
        res.render("editPost", { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Page that goes into editComment handlebars that asks the user if he is willing to delete the post.
router.get("/edit/comment/:id", withAuth, (req, res) => {
    Comments.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "comment", "created_at"],
        include: [
        {
            model: User,
            attributes: ["username"]
        },
        ]
    })
    .then(dbCommentData => {
        const comment = dbCommentData.get({ plain: true });
        res.render("editComment", { comment, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 