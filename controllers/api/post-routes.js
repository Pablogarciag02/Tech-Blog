const router = require('express').Router();
const { Posts, User, Comments} = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", (req, res ) => {
    Posts.findAll({
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
            },
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get("/:id", (req, res) => {
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
                model: User,
                attributes: ["username"]
            },
            {
                model: Comments,
                attributes: ["id", "comment", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: "no post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post("/", withAuth, async (req, res) => {
    try {
      const dbPostData = await Posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
    //   console.log(user_id);
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbPostData);
        // res.redirect("/");
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.put("/:id", withAuth, (req, res) => {
    Posts.update({
        title: req.body.title,
        content: req.body.content
        },
        {
        where: {
            id: req.params.id
        }      
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "no post with this id "});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
    Posts.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });



module.exports = router;