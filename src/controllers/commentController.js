const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;
  const { id } = req.user;
  console.log(req.body);
  console.log(req.user);

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: parseInt(postId) } },
        author: { connect: { id: id } },
      },
      include: {
        author: true,
      },
    });
    res.status(201).json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment" });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: {
        author: true,
      },
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
      data: { content },
      include: {
        author: true,
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
    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while deleting the comment" });
  }
};
