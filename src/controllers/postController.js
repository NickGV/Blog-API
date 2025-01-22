const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req;
  const image = req.file ? req.file.path : null;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        tags,
        authorId: user.id,
      },
    });
    res.json({ post });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while creating the post" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
      },
    });
    res.json({ posts });
  } catch (error) {
    res.status(400).json({ error: "An error occurred while fetching posts" });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: true,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ post });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while fetching the post" });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        image,
        tags,
      },
    });
    res.json({ post });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while updating the post" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while deleting the post" });
  }
};
