const bcrypt = require("bcryptjs");
const { prisma } = require("../config/prisma");
const jwt = require("jsonwebtoken");

const generateToken = (userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const loginUser = async (email, password) => {
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new Error("Email not found");
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = generateToken(existingUser.id, existingUser.email);

    return { message: "Login successful", token };
  } catch (error) {
    console.error("Error during login:", error.message);
    if (error.message === "Email not found") {
      throw new Error("Email not found, please check your credentials");
    } else if (error.message === "Invalid password") {
      throw new Error("Invalid password, please check your credentials");
    } else {
      throw new Error("Login failed");
    }
  }
};

module.exports = { loginUser };
