const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    //get the token from the auhtorization header

    //check if the token matches the original token
    const decodedToken = jwt.verify(token, "secret");

    //retrieve the user details of the loggedin user
    const user = decodedToken;

    //pass the user down to the endpoint
    req.user = user;

    //passdown the fucntionality to the endpoint
    next();
  } catch (error) {
    res.status(401).send("Invalid request!");
  }
};
