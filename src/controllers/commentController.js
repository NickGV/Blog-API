const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;
  const { user } = req;
  console.log(content, postId, user);

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId: user.id,
      },
    });
    res.json({ comment });
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ error: "An error occurred while creating the comment" });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
    });
    res.json({ comments });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while fetching comments" });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        content,
      },
    });
    res.json({ comment });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while updating the comment" });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while deleting the comment" });
  }
};
