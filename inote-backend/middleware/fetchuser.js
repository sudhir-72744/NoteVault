const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_token";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "pelase auth using a valid token`" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    // console.log(data);
    req.user = data.id;
    // console.log("sadx");
    next();
  } catch (error) {
    res.status(401).send({ error: "pelase auth using a valid token" });
  }
};

module.exports = fetchuser;
