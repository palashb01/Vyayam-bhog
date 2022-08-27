import User from "../models/user.js";
import { decryptAndCompare, encrypt } from "../utils/encrypt.js";

//! Signs up / Registers the user at /auth/signup
export const signUp = (req, res, next) => {
  const { email, password } = req.body;
  var user;
  //note: Considering password == confirmPassword validation is done in frontend

  // Checking if similar user exist
  User.findOne({ email })
    .then((result) => {
      if (result) {
        return res.status(400).json({
          message: `This email address is already in use`,
        });
      }

      encryptedPassword = encrypt(password);

      //TODO: Complete user model
      user = new User({});
      user.save();

      //TODO: Implement JWT if required
      return res.status(201).json({
        message: `User created successfully`,
        data: {
          id: user._id,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

//! Signs in / Logins the user at /auth/signin
export const signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: `The email ID is not in use... Try registering as a new user`,
        });
      }
      decryptAndCompare(password, user.password, (isMatch) => {
        if (!isMatch) {
          return res.status(400).json({
            message: `The entered password is incorrect`,
          });
        }
        //TODO: Implement JWT if required
        res.status(200).json({
          message: ``,
          data: {
            id: user._id,
            //note: check if we need to return the whole user or implement another endpoint for user details
            user: user,
          },
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};
