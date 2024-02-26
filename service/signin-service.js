const bcrypt = require("bcryptjs");
const { prisma } = require("../config/prisma");

const getUser = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (users) => {
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email: users.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(users.password, 10);

    const mappedUser = {
      data: {
        username: users.username,
        email: users.email,
        password: hashedPassword,
      },
    };

    const createdUser = await prisma.users.create(mappedUser);
    return createdUser;
  } catch (error) {
    console.error(error);
    if (error.message === "Email already exists") {
      throw new Error("Email sudah terdaftar, silakan gunakan email lain");
    } else {
      throw new Error("Gagal membuat User baru!");
    }
  }
};

module.exports = { getUser, createUser };
