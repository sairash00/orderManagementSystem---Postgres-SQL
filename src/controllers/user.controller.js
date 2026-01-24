import * as userService from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
   
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //NOTE: calling the service layer service layer..
    //NOTE: service layer is another directory where all the business logics are.

    const result = await userService.registerUser({
      name,
      email,
      password,
    });

    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {
    
    if (error.isOperational) {
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message,
      });
    }


    console.error("Register User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
   
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //NOTE: calling the service layer service layer..
    //NOTE: service layer is another directory where all the business logics are.

    const result = await userService.loginUser({
      email,
      password,
    });

    
    return res.status(201).json({
      success: true,
      message: "User Logged in successfully",
      data: result,
    });

  } catch (error) {
    
    if (error.isOperational) {
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Login User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserProfile = async (req, res)=> {
  try {
    const userId = req.params.id;

    if(!userId){
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      })
    }

    const result  = await userService.getUserProfile(userId);

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: result
    })
    
  } catch (error) {
    if(error.isOperational){
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Get User Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
}

export const getUserId = async(req,res) => {
  try {

    const username = req.body.username;
    
    if(!username){
      return res.status(400).json({
        success: false,
        message: "Username is required"
      })
    }

    const result = await userService.getUserId(username);

    return res.status(200).json({
      success: true,
      message: "User Id fetched successfully",
      data: result
    });

    
  } catch (error) {
    if(error.isOperational){
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message
      })
    }
    console.error("error getting user ID:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}