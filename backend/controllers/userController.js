/////  Here we will Write The Logic By Which the user can login in and Register 


/* 👉 Ye code 3 kaam karta hai:

User Register
User Login
Admin Login
JWT Token banana (authentication) */

import userModel from "../models/userModel.js";
import validator from "validator";  /* 👉 Email validate karega */
import bcrypt from "bcrypt";/* 👉 Password ko hash karne ke liye   compare karne ke liye */
import jwt from "jsonwebtoken" /* 👉 Token banane ke liye (authentication) */


const createToken = (id) => {
  /* jwt.sign(payload, secret) 👉 Ye ek encoded string (token) banata hai */
  /* process.env.JWT_SECRET 👉 Ye ek hidden key hai (server ke paas hi hoti hai) */
  /* Payload: { id } */
  return jwt.sign({ id }, process.env.JWT_SECRET)  /// this  id created automatically  when user is created but THe Secret Key Is genereted by us Mainuly 
}




/// Route for user Login  \
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; /// take email and password from the body 

    // Check user exists
    const user = await userModel.findOne({ email });

    if (!user) {   // if user not exist then 
      return res.json({ success: false, message: "User does not exist" });
    }
    ///// if user exist and now we have To compare the password 
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {  // if password not matches then 
      return res.json({ success: false, message: "Invalid Credentials" });
      ////// yeha ager only invalid password likha na to sidha hack ho jayega account to islye use inavlid credentails okey 
    }
    //// if password matches then now we have to create a  token and then send it to the user 
    // Generate token 
    const token = createToken(user._id); //creating token 
    res.json({ success: true, token }); // sending token

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


/// Routes for user Registration \ 

const registerUser = async (req, res) => {
  // res.json({ msg: "Register Api Working" }); // to check whether it is workin or not 

  try {
    const { name, email, password } = req.body; /// Here we have taken the name , email , password from the body 

    /// (CHECK-1)   /////  Check wheter User is already available or not with this email id okey 
    const exists = await userModel.findOne({ email }); /// if any user is available with this emailId then it will be stored in this exists 

    if (exists) {   ///// if user with email exists then 
      return res.json({ success: false, message: "User Already Exist With This Email Id  " });
    }


    ////// Validating Email Formate And Strong Password 
    if (!validator.isEmail(email)) {   //// if email is not validated then 
      /* 👉 Check:  @ hai? format correct hai? */
      return res.json({ success: false, message: "Please Enter A Valid Email " })
    }

    if (password.length < 8) {   //// if email is not validated then 
      return res.json({ success: false, message: "Please Enter A Strong Password" })
    }


    ///// Hashing USer Password 
    /* firstely we create salt and after that we create hashedPassword  */
    const salt = await bcrypt.genSalt(10); ////// 👉 Salt ==> 👉 Random string hoti hai jo password me add hoti hai
    const hashedPassword = await bcrypt.hash(password, salt);



    //// If NOW User Email is Valid And  hashedPassword is Strong then WE have to create the account of the user \
    ///// naya user banega naya userModel se to hame naya userModel banana padega 
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    })
    const user = await newUser.save()
    //// After Adding above all Our user wil be added in the database okey / 
    //***** WhenEver A new user is created then with creation of user a _id is also created   And By Using This Id We will generate a Token   */

    // NOw Here Ww Will Provide A token By whcih user  can login in the appliction  / 
    const token = createToken(user._id);
    res.json({ success: true, token })




  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }



};



/// Routes for Admin Login

const adminLogin = async (req, res) => {
  try {
    // 1️⃣ Get email and password from request body
    const { email, password } = req.body;

    // 2️⃣ Check if entered credentials match admin credentials stored in .env
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      // 3️⃣ If credentials are correct → create JWT token
      // We pass an object (payload) inside token (best practice)
      const token = jwt.sign(
        { email },                 // payload (data inside token)
        process.env.JWT_SECRET,    // secret key
        { expiresIn: "1d" }        // optional: token expiry
      );

      // 4️⃣ Send success response with token
      return res.status(200).json({
        success: true,
        token,
        message: "Login Successful"
      });

    } else {
      // 5️⃣ If credentials are wrong → send error response
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

  } catch (error) {
    // 6️⃣ If any server error occurs
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { loginUser, registerUser, adminLogin }