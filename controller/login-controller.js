const loginService = require("../service/login-service");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await loginService.loginUser(email, password);
    res.status(200).json({
      message: "Login successful",
      token: loggedInUser.token,
    });
  } catch (error) {
    console.error("Error during login: " + error);
    res.status(401).json({
      message: "Login failed",
    });
  }
};

module.exports = { loginUser };
