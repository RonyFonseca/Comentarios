import express from "express"
import check from "../middlewares/check.js"
import comentControllers from "../controllers/comentControllers.js"

const router = express.Router()

router.get("/dashboard", check, comentControllers.showDashboard)
router.post("/post", check, comentControllers.comentPost)
router.get("/delete/:id", comentControllers.delete)
router.get("/edit/:id", comentControllers.edit)
router.post("/edit/post", comentControllers.editPost)

router.get("/home", check, comentControllers.showComent)

export default router