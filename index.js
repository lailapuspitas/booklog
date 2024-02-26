const express = require("express");
const { logger } = require("./middleware/log");
const { authentication } = require("./middleware/authentication");
const { upload } = require("./middleware/multer");

const { signinRoute } = require("./route/signin-route");
const { loginRoute } = require("./route/login-route");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

app.use("/signin", signinRoute);
app.use("/login", loginRoute);

app.use(authentication);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
