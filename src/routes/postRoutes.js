const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticate, upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticate, upload.single('image'), updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;