const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  console.log(req.body);
  const { title, content, image, tags, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        tags,
        authorId,
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image, tags } = req.body;
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
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
