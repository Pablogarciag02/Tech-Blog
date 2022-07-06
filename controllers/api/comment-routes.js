const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");



// GET all comments
router.get('/', (req, res) => {
  Comments.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err); 
          res.status(500).json(err); 
      })
});

// CREATE new comments 
router.post('/', withAuth, (req, res) => {
  // check session
  if (req.session) {
  Comments.create({
      comment: req.body.comment, 
      post_id: req.body.post_id,
      user_id: req.session.user_id,
  })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      })
  }
});

// DELETE COMMENT 
router.delete('/:id', withAuth, (req, res) => {
  Comments.destroy({
      where: {
          id: req.params.id 
      }
  }).then(dbCommentData => {
      if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
      }
      res.json(dbCommentData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router; 