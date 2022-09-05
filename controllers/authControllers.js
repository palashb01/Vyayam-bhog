import User from "../models/user.js";
// import { decryptAndCompare, encrypt } from "../utils/encrypt.js";
import generateToken from "../middleware/util.js";
import firebaseAdmin from '../config/firebaseAdmin.config.js'

//! Signs up / Registers the user at /auth/signup
export const signUp = async (req, res, next) => {
  // const { email, password } = req.body;


    //! Taking the firebaseID from the frontend
  const {firebaseID} = req.body;
  if (!firebaseID) {
    return res.status(400).json(errormessage('FirebaseId is required'));
  }

  //verify the token 
  const decoded = await firebaseAdmin.auth().verifyIdToken(firebaseID);

  const number = decoded.phone_number;

  if (!number) {
    return res.status(400).json(errormessage('Invalid FirebaseId'));
  }

  //Finding the User with same phonenumber
  User.findOne({ phoneNumber: number}).then((result)=>{
    if (result) {
            return res.status(400).json({
              message: `This email address is already in use`,
            });
    }
    const user = new User({
      name: req.body.name,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      description: req.body.description,
      gender: req.body.gender,
      dob: req.body.dob,
      isPremium: req.body.isPremium
     });
  
    user.save();
  
    // Generating the Token with JWT 
  
    const token = generateToken(JSON.stringify(user._id));
  
    //! Returning the Token
    return res.status(200).json({
      message:`User created successfully`,
      token:token
    });
    
    }

  ) .catch((err) => {
    return res.status(400).json({
      message: err,
    });
  })
  
  
  //note: Considering password == confirmPassword validation is done in frontend

  // Checking if similar user exist
  // User.findOne({ email })
  //   .then((result) => {
  //     if (result) {
  //       return res.status(400).json({
  //         message: `This email address is already in use`,
  //       });
  //     }

  //     encryptedPassword = encrypt(password);

      // Checking the FirebaseID for the token

      // if (!firebaseID) {
      //   return res.status(400).json(errormessage('FirebaseId is required'));
      // }
      // const decoded = await firebaseAdmin.auth().verifyIdToken(firebaseID);

		  // const number = decoded.phone_number;

      // if (!number) {
      //   return res.status(400).json(errormessage('Invalid FirebaseId'));
      // }

      // const user = new User({
      //   name: req.body.name,
      //   location: req.body.location,
      //   phoneNumber: req.body.phoneNumber,
      //   email: req.body.email,
      //   description: req.body.description,
      //   gender: req.body.gender,
      //   dob: req.body.dob,
      //   isPremium: req.body.isPremium
      //  });

      // user.save();

      // // Generating the Token with JWT 

      // const token = generateToken(JSON.stringify(user._id));

     
      // return res.status(200).json({
      //   message:`User created successfully`,
      //   token:token
      // });
	    
      // return res.status(201).json({
      //   message: `User created successfully`,
      //   data: {
      //     id: user._id,
      //   },
      // });
  
    // .catch((err) => {
    //   return res.status(400).json({
    //     message: err,
    //   });
    // });
};

//! Signs in / Logins the user at /auth/signin
export const signIn = async (req, res, next) => {

  const {firebaseID} = req.body;
  if (!firebaseID) {
    return res.status(400).json(errormessage('FirebaseId is required'));
  }
  const decoded = await firebaseAdmin.auth().verifyIdToken(firebaseID);

  const number = decoded.phone_number;

  if (!number) {
    return res.status(400).json(errormessage('Invalid FirebaseId'));
  }

  //Finding the User with same phonenumber
  User.findOne({ phoneNumber: number}).then((result)=>{
    if (!result) {
            return res.status(400).json({
              message: `user not Found`,
            });
    }
    // Generating the Token with JWT 
    const token = generateToken(JSON.stringify(result._id));
  
    //! Returning the Token
    return res.status(200).json({
      message:`User Logged in successfully`,
      token:token
    });
    
    }

  ) .catch((err) => {
    return res.status(400).json({
      message: err,
    });
  })
}





  // const { email, password } = req.body;
  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(400).json({
  //         message: `The email ID is not in use... Try registering as a new user`,
  //       });
  //     }
  //     decryptAndCompare(password, user.password, (isMatch) => {
  //       if (!isMatch) {
  //         return res.status(400).json({
  //           message: `The entered password is incorrect`,
  //         });
  //       }

  //       //! Finding the FirebaseId from the req.body
  //      const { firebaseID } = req.body;
	// 	const decoded = await firebaseAdmin.auth().verifyIdToken(firebaseID);
	// 	const number = decoded.phone_number;

  //   if (!number) {
	// 		return res.status(400).json(errormessage('Invalid FirebaseId'));
	// 	}

  //   //Generating the JWT token
  //   const token = generateToken(JSON.stringify(user._id));
    
  //   return res
	// 			.status(200)
	// 			.json({
  //         message: `logged in Successfuly`,
  //         token: token
  //       });
        // res.status(200).json({
        //   message: ``,
        //   data: {
        //     id: user._id,
        //     //note: check if we need to return the whole user or implement another endpoint for user details
        //     user: user,
        //   },
//         // });
//       });
//     })
//     .catch((err) => {
//       return res.status(400).json({
//         message: err,
//       });
//     });
// };
