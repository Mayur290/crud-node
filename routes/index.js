import express, { Router } from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
  productController,
} from "../controllers";
import auth from "../middlewares/auth";
const router = express.Router();

// Authentication
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

//CRUD
router.post("/products", auth, productController.store);

export default router;
