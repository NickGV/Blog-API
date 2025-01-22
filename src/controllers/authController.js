const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bycrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(400).json({ error: "No user found" });
  }
  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token, user });
};

exports.logout = (req, res) => {
  res.json({ user: null });
};
