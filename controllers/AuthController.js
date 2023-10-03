const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
var jwt = require('jsonwebtoken')

class AuthController{

    static userRegister = async(req,res) => {
        try{
            // console.log(req.body);
            const { name, userName, email, password } = req.body

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)

            const data = new UserModel({
                name: name,
                userName: userName,
                email: email,
                password: hashPassword,
            })

            const dataSaved = await data.save()

            if (dataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Registration Successful' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Error, Try Again!' })
            }
        }catch(err){
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static userLogin = async(req,res) => {
        try{
            // console.log(req.body);
            const { userName, password } = req.body

            if (userName && password) {
                const user = await UserModel.findOne({ userName: userName })

                if (user != null) {
                    const isPasswordMatched = await bcrypt.compare(password, user.password)

                    if ((user.userName === userName) && isPasswordMatched) {
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
                        // console.log(token);
                        res.cookie('token', token)

                        res.status(201).json({ 'status': 'success', 'message': 'Login Successfully with Web Token', token, user })
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'User not Found' })
                    }
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Username not Found' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are required' })
            }
        }catch(err){
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static logout = async(req,res) => {
        try{
            res.cookie("token", null, {
                expires: new Date(Date.now())
            })

            res.status(201).json({ success: true, message: 'Logged Out' })
        }catch(err){
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = AuthController