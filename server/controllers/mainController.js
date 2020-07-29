const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { encrypt, comparePass } = require('../helpers/bcrypt')
const { User } = require ('../models')

class MainController{
    static login ( req, res, next ){
        const loginData  = {
            email : req.body.email,
            password : req.body.password,
        }
        if(!loginData.email || loginData.email == "" ){
            throw {
                name: "customErr",
                message: "email cannot be empty",
                status : 400,
            }
        } else if(!loginData.password || loginData.password == ""){
            throw {
                name: "customErr",
                message: "password cannot be empty",
                status : 400,
            }
        }
        
        User.findOne ({ where : { email : loginData.email }})
        .then( result => {
            if( comparePass(loginData.password, result.password )) {
                const token = {
                    id: result.id,
                    email: result.email,
                    role: result.role,
                }
                const access_token = jwtSign(token)
                return res.status(200).json({
                    access_token: access_token,
                    id: result.id,
                    role: result.role
                })
            } else {
                throw {
                    name: "customErr",
                    message: "data not found",
                    status : 404,
                }
            }
        })
        .catch( err => {
            let errMsg = {
                name: "customErr",
                message: "data not found",
                status : 404,
            }
            next(errMsg)
        })
    }


    static registerCust ( req, res, next ){
        const registerData  = {
            email : req.body.email,
            password : req.body.password,
            role: "customer",
        }
        if(!registerData.email || registerData.email == "" ){
            throw {
                name: "customErr",
                message: "email cannot be empty",
                status : 400,
            }
        } else if(!registerData.password || registerData.password == ""){
            throw {
                name: "customErr",
                message: "password cannot be empty",
                status : 400,
            }
        }
        
        User.create (registerData)
        .then( result => {
            res.status(201).json(result)
        })
        .catch( err => {
            let errMsg = {
                name: "Internal Server Error",
                message: "Internal Server Error",
                status : 500,
            }
            next(errMsg)
        })
    }
}

module.exports = MainController