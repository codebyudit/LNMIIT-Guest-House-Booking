import express from 'express'
import { forgotPassword} from '../controllers/forgotPasswordController.js'

const forgotPassRouter = express.Router()

forgotPassRouter.post('/forgot-password' , forgotPassword)
// forgotPassRouter.post('/reset-password/:token' , resetPassword)

export default forgotPassRouter