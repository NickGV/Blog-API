const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", authenticate, createComment);
router.get("/post/:postId", getCommentsByPostId);
router.put("/:id", authenticate, updateComment);
router.delete("/:id", authenticate, deleteComment);

module.exports = router;
