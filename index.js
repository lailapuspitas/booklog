const express = require("express");
const bodyParser = require("body-parser");
const { logger } = require("./middleware/log");
const { authentication } = require("./middleware/authentication");

const { signinRoute } = require("./route/signin-route");
const { loginRoute } = require("./route/login-route");
const { trackerRoute } = require("./route/tracker-route");
const { reviewRoute } = require("./route/review-route");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/signin", signinRoute);
app.use("/login", loginRoute);
app.use("/tracker", trackerRoute);
app.use("/review", reviewRoute);

app.use(authentication);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
