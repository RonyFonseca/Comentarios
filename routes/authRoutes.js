import express from "express"
import autController from "../controllers/authControllers.js"
import authControllers from "../controllers/authControllers.js"


const router = express.Router()

router.get("/login", autController.showLogin)
router.post("/login/post", authControllers.loginPost)

router.get("/register", authControllers.showRegister)
router.post("/register/post", authControllers.registerPost)

router.get("/logout", autController.logout)

export default router