const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (bearerToken) {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    req.token = token;

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { auth };
