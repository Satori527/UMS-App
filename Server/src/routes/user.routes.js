import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    getUsersByName,
    helloTest,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateUserInfo
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
helloTest
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/create").post(verifyJWT, createUser)
router.route("/update").patch(verifyJWT, updateUserInfo)
router.route("/delete").delete(verifyJWT, deleteUser)
router.route("/users").get(verifyJWT, getUsers)
router.route("/user").get(verifyJWT, getUserById)

router.route("/search").get(verifyJWT, getUsersByName)

export default router