const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //get the token from the auhtorization header
    const token = req.headers.authorization.split(" ")[1];

    //check if the token matches the original token
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    //retrieve the user details of the loggedin user
    const user = decodedToken;

    //pass the user down to the endpoint
    req.user = user;

    //passdown the fucntionality to the endpoint
    next();
  } catch (error) {
    res.status(401).send({
      error: new Error("Invalid request!"),
    });
  }
};
