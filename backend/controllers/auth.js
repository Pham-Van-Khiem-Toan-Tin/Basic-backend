const { toTitleCase, validateEmail } = require("../configs/functionEmail");
const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Auth {
  //Authorization
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch (error) {
      res.status(404);
    }
  }
  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch (error) {
      res.status(404);
    }
  }
  //Authentication
  //User signup
  async postSignUp(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 character" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if (password.length < 8 || password.length > 255) {
          error = {
            ...error,
            password: "Password must be 8 character",
            name: "",
            email: "",
          };
          return res.json(error);
        } else {
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: eamil });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                eamil: "Email already exits",
              };
              return res.json(error);
            } else {
              let newUser = userModel({
                name,
                email,
                password,
                //Here role 1 for admin signup role 0 for customer signup
                userRole: 1, //field Name change to userRole from role
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Acount create successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json(error);
      }
    }
  }

  //User login
  async postSignIn(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            process.env.secret
          );
          const encode = jwt.verify(token, process.env.secret);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
