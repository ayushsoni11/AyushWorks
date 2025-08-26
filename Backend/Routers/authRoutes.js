import express from "express";
import { loginValidation, signupValidation } from "../Middlewares/authMiddleware.js";
import {signup, login} from "../Controllers/authController.js";

const router  = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

export default router;
