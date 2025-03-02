
import User from "../model/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config();

       
   
export function postUsers(req, res) {

    const user =req.body;
      //password hash
    const password =req.body.password;
    const saltBounds = 10;
    const passwordHash = bcrypt.hashSync(password,saltBounds);

    console.log(passwordHash);
    user.password = passwordHash;
//end hash
    const newUser =new User(user);

    newUser.save()
    .then(
        ()=> res.json({
             message: "User created" })
        
    ).catch(()=>{
            res.json({
                message: "User not created", })
        }
    )
}

export function loginUser(req, res) {
    const credentials = req.body;

    // Find user by email
    User.findOne({ email: credentials.email }).then((user) => {
        if (user == null) {
            // User not found
            res.status(403).json({
                message: "User not found",
            });
        } else {
            // Compare plain text password with hashed password
            const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

            if (!isPasswordValid) {
                // Password does not match
                res.status(403).json({
                    message: "Incorrect password",
                });
            } else {
                // Password is valid, create JWT token
                const payload = {
                    id: user._id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    type: user.type,
                };

                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "4d" });

                // Return success response
                res.json({
                    message: "Login successful",
                    user: {
                        id: user._id,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        type: user.type,
                    },
                    token: token,
                });
            }
        }
    }).catch((err) => {
        // Handle unexpected errors
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    });
}

export function isAdminValid(req){
    if(req.user ==null){
        return false;
    }
    if(req.user.type != "admin"){
        return false;
    }
    return true;
}

// check user is logged customer
export function isCustomerValid(req){
    if(req.user ==null){
        return false;
    }
    console.log(req.user);
    if(req.user.type != "customer"){
        return false;
    }
    return true;
}

export function getUser(req, res){ 
    const user = req.body.user;

    if(user==null){
        res.status(403).json({
            message: "User not found",
        });
    }
    else{
        res.json({
            message: "User found",
            user : user
        });

    } 
}

export function getAllUsers(req, res) {
    // Validate admin
    if (!isAdminValid(req)) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }
  
    // Extract page and pageSize from query parameters
    const page = parseInt(req.body.page) || 1; // Default to page 1
    const pageSize = parseInt(req.body.pageSize) || 10; // Default to 10 items per page
    const skip = (page - 1) * pageSize;
  
    User.find()
      .skip(skip)
      .limit(pageSize)
      .then((users) => {
        User.countDocuments().then((totalCount) => {
          res.json({
            message: "Users found",
            users: users,
            pagination: {
              currentPage: page,
              pageSize: pageSize,
              totalUsers: totalCount,
              totalPages: Math.ceil(totalCount / pageSize),
            },
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error fetching users",
          error: err,
        });
      });
  }

  export function delelteUserByEmail(req, res) {
    //validate admin
    if (!isAdminValid(req)) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }
    const email = req.params.email;
  
    User.findOneAndDelete({ email: email })
      .then(() => {
        res.json({
          message: "User deleted",
        });
      })
      .catch((err) => {
        res.json({
          message: "User delete failed",
          error: err,
        });
      });
  }

  export function disableUser(req, res) {
    //validate admin
    if (!isAdminValid(req)) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }
    const userId = req.params.userId;
    const disabled = req.body.disabled;
  
    User.findOneAndUpdate({ _id: userId }, { disabled: disabled })
      .then(() => {
        res.json({
          message: "User disabled/enabled",
        });
      })
      .catch((err) => {
        res.json({
          message: "User disable/enable failed",
          error: err,
        });
      });
  }

  