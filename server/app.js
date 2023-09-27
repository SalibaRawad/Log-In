const express = require("express");
const app = express();
//bcrypt is used to hash the password
const bcrypt = require("bcrypt");
//jwt is used to create a token for authentication and authorization
const jwt = require("jsonwebtoken");
//cors is used to curb cores error
const cors = require("cors");
//nodemailer is used to send emails (forgot password)
const nodemailer = require("nodemailer");
const logger = require("morgan");
const auth = require("./auth");

const dotenv = require("dotenv");
dotenv.config();

//require database connection
const dbConnect = require("./db/dbConnection");
const User = require("./models/User");

const port = process.env.PORT || 3000;

// require database connection

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-reqed-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("combined"));

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// login endpoint
app.post("/login", (req, res) => {
  // check if email exists
  User.findOne({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "10d" }
          );

          //   return success res
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// register endpoint
app.post("/register", async (req, res) => {
  // hash the password

  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.get("/auth-endpoint", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "Email not found" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Resset Your Password",
      text: `http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send({ Status: "Email sent" });
      }
    });
  });
});

app.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send({ Status: "Token not valid" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
            .then((user) => {
              res.send({ Status: "Password changed successfully" });
            })
            .catch((err) => {
              res.send({ Status: err });
            });
        })
        .catch((err) => {
          res.send({ Status: err });
        });
    }
  });
});

app.get("/profile", auth, (req, res) => {
  console.log("hello");
});

module.exports = app;
