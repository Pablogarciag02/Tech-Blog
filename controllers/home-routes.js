const router = require("express").Router();
const { User, Posts } = require("../models");

// router.get("/", async(req, res) => {
//     res.render("homepage", {
//         loggedIn: req.session.loggedIn,
//     });
// });

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
        // .then(posts => {
        //     console.log(posts + "1");
        // }).then(dbPosts => {
        //     console.log(dbPosts + "2");
        // }) .catch(err =>{
        //     console.log(err)
        // })

        console.log(dbPosts);

        // const users = dbUserData.map((user) => 
        //     user.get({ plain: true })
        // );

        const posts = dbPosts.map((posts) => 
            posts.get({ plain: true })
        );

        // console.log(users);
        console.log(posts);
        res.render("homepage", {
            // users,
            posts,
            pageTitle: "Tech-Blog",
            loggedIn: req.session.loggedIn,
            login: true,
            hasPosts: posts.length > 0

        });
        // return users, posts;


      
    }
   
    
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // })


});

module.exports = router;