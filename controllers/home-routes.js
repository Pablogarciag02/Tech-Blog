const router = require("express").Router();
const { User, Posts, Comments } = require("../models");

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

        console.log(dbPosts);

        const posts = dbPosts.map((posts) => 
            posts.get({ plain: true })
        );

        console.log(posts);
        res.render("homepage", {
            posts,
            pageTitle: "Tech-Blog",
            loggedIn: req.session.loggedIn,
            login: true,
            hasPosts: posts.length > 0

        });   
    }
   
    
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get("/:id", async (req, res) => {

    try {
        const dbPost = await Posts.findByPk(req.params.id,{

            // include: [
            //     {
            //         model: User,
            //         attributes: ["username"],
            //     },
            // ],
        })

        // console.log(dbPost);

        const post = dbPost.get({ plain: true });

       console.log(post)

        res.render("individual", {
            post,
            pageTitle: "Tech-Blog",
            loggedIn: req.session.loggedIn,
            login: true,
            hasPosts: post.length > 0

        });   
    }
   
    
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }

});



router.post("/:id", async (req, res) => {
    try { 
        const dbPostData = await Posts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,

        }); console.log(req.body)

    } catch(err) {
    console.log(err);
        res.status(500).json(err)
    }

    res.redirect("/");
    
})





router.get("/:id", async (req, res) => {

    try {
        const dbComment = await Comments.findByPk(req.params.id,{

            // include: [
            //     {
            //         model: User,
            //         attributes: ["username"],
            //     },
            // ],
        })

        // console.log(dbPost);

        const comment = dbComment.get({ plain: true });

       console.log(comment)

        res.render("individual", {
            comment,
            pageTitle: "Tech-Blog",
            loggedIn: req.session.loggedIn,
            login: true,
            hasComments: post.length > 0

        });   
    }
   
    
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }

});


router.post("comments/:id", async (req, res) => {
    try { 
        const dbCommentData = await Comments.create({
            comment: req.body.comment,
            user_id: req.session.user_id,

        }); console.log(req.body)

    } catch(err) {
    console.log(err);
        res.status(500).json(err)
    }

    // res.redirect("/:");
    
})
module.exports = router;