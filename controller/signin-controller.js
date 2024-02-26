const signinService = require("../service/signin-service");

const getUser = async (req, res) => {
  try {
    const users = await signinService.getUser();
    res.status(200).json({
      message: "Success in retrieving data!",
      data: { users }, // Wrap users in an object
    });
  } catch (error) {
    console.error("Error fetching data: " + error);
    res.status(500).json({
      message: "Error fetching data",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const users = req.body;
    const createdUser = await signinService.createUser(users);
    res.status(201).json({
      message: "New user created",
      data: createdUser,
    });
  } catch (error) {
    console.error("Error creating user: ", error); // Log error for debugging
    let errorMessage = "Failed to create user. Please try again later.";
    if (error.response && error.response.status === 401) {
      errorMessage = "Unauthorized. Please login to continue.";
    }
    res.status(500).json({
      message: errorMessage,
    });
  }
};

module.exports = { getUser, createUser };
