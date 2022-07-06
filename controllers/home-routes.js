const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
    console.log(req.session);

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



router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login")
})

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
        //Serializing Data
        const post = dbPostData.get({ plain: true });

        //Pasing data to template
        res.render("individual", {post, loggedIn: req.session.loggedIn})

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});





router.post("/api/posts/:id", withAuth, (req, res) => {
    Posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    console.log(dbPostData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
















// router.get("/", async (req, res) => {
//     try {
//         const dbPosts = await Posts.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ["username"],
//                 },
//             ],
//         })

//         console.log(dbPosts);

//         const posts = dbPosts.map((posts) => 
//             posts.get({ plain: true })
//         );

//         console.log(posts);
//         res.render("homepage", {
//             posts,
//             pageTitle: "Tech-Blog",
//             loggedIn: req.session.loggedIn,
//             login: true,
//             hasPosts: posts.length > 0

//         });   
//     }
   
    
//     catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }

// });




// router.get("/:id", async (req, res) => {

//     try {
//         const dbPost = await Posts.findByPk(req.params.id,{
//             include: [
//                 {
//                     model: User,
//                     attributes: ["username"],
//                 },
//                 {
//                     model: Comments,
//                     attributes: ["comment", "created_at"]
//                 }
//             ],
//         })

//         const post = dbPost.get({ plain: true });

//     //    console.log(post)

//         res.render("individual", {
//             post,
//             pageTitle: "Tech-Blog",
//             loggedIn: req.session.loggedIn,
//             login: true,
//             hasPosts: post.length > 0

//         });   
//     }
   
//     catch (err) {
//         console.log(err);
//         res.status(404).json(err);
//     }

// });

// router.get("/", async (req, res) => {

//     try {
//         const dbComments = await Comments.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ["username"],
//                 },
//             ],
//         })

//         const comments = dbComments.get({ plain: true });

//        console.log(comments)

//         res.render("individual", {
//             comments,
//             pageTitle: "Tech-Blog",
//             loggedIn: req.session.loggedIn,
//             login: true,
//             hasComments: comments.length > 0

//         });   
//     }
   
//     catch (err) {
//         console.log(err);
//         res.status(404).json(err);
//     }

// });



// router.post("/:id", withAuth, async (req, res) => {
//     try { 
//         const dbPostData = await Posts.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id,

//         }); console.log(req.body)

//     } catch(err) {
//     console.log(err);
//         res.status(500).json(err)
//     }

//     res.redirect("/");
    
// })



module.exports = router;