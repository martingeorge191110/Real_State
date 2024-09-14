import express from "express"
import { authValidation, resetPssword, sendGenCode, signIn, singUp } from "../Controllers/authController.js"

const Auth = express.Router()

/* Sing Up user router */
Auth.route("/sign-up").post(singUp)

/* Sing In user router */
Auth.route("/sign-in").post(signIn).get(authValidation)

/* Send generated code in case of reset password process */
Auth.route("/mail-gen-code").post(sendGenCode)

/* Updating password after make sure about genCode */
Auth.route("/resetPass").put(resetPssword)

export default Auth
