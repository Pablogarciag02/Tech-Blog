const router = require("express").Router();
const { Comments, Posts } = require("../../models");
const withAuth = require("../../utils/auth");



// GET all comments
router.get("/", (req, res) => {
  Comments.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err); 
          res.status(500).json(err); 
      })
});

//Create new comments with the user id of the user thats signed in.
router.post("/", withAuth, async (req, res) => {
    try {
      const dbCommentData = await Comments.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbCommentData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// DELETE COMMENT 
router.delete("/:id", withAuth, (req, res) => {
  Comments.destroy({
      where: {
          id: req.params.id 
      }
  }).then(dbCommentData => {
      if (!dbCommentData) {
          res.status(404).json({ message: "No comment found with this id" });
          return;
      }
      res.json(dbCommentData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router; 