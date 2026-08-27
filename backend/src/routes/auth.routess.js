import express from 'express'
import { editprofile, login, logout, signup} from "../controller/auth.controllerr.js"
import { protectRoute,  } from '../middlewear/auth.middlewear.js';
import { onboard } from '../controller/auth.controllerr.js';
const router = express.Router();

// all function are defined in controller
//  EVERY TIME AN OBJECT IS CREATED
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//TODO:create fogot password route and reset password route


// the protected route is create to check this authentication before going to any other 
router.post("/onboarding", protectRoute , onboard )
router.post("/edit-profile", protectRoute , editprofile )

// to check who is loggedIn or authenticated
router.get("/me", protectRoute ,(req,res) =>{
    res.status(200).json({success: true, user : req.user})
})

export default router;