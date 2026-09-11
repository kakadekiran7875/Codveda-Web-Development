const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  upvotePost
} = require('../controllers/postController');
const { validatePostInput } = require('../middleware/validator');

router.route('/')
  .get(getAllPosts)
  .post(validatePostInput, createPost);

router.route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

router.route('/:id/upvote')
  .patch(upvotePost);

module.exports = router;
