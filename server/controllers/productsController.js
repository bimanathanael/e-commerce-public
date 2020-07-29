const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { Product } = require ('../models')
// const {gt, lte, ne, in: opIn} = Sequelize.Op;

class ProductsController{
    static add(req,res, next){
        // console.log(req.body,"newOnenewOne")
        let newOne = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
        }

        if( newOne.name == "" ){
            throw {
                name: "customErr",
                message: "name cannot be empty",
                status : 400,
            }
        } else if( newOne.image_url == "" ){
            throw {
                name: "customErr",
                message: "image_url cannot be empty",
                status : 400,
            }
        } else if ( newOne.price == "" ){
            throw {
                name: "customErr",
                message: "price cannot be empty",
                status : 400,
            }
        } else if( newOne.stock == ""){
            throw {
                name: "customErr",
                message: "stock cannot be empty",
                status : 400,
            }
        }else if ( typeof newOne.price != "number" || typeof newOne.stock != "number" ){
            throw {
                name: "customErr",
                message: "Price and Stock must be a Number",
                status : 400,
            }
        } else if ( newOne.price <= 0 || newOne.stock <= 0 ){
            throw {
                name: "customErr",
                message: "Price and Stock must be more then 0",
                status : 400,
            }
        }

        Product.create(newOne)
        .then( data => {
            // console.log(data,"datadata")
            return res.status(201).json(data)
        })
        .catch ( err => {
            // console.log(err,"errerr")

            return res.status(500).json(err)
        })

    }

    static view(req,res, next){
        // Product.findAll({
        //     where: {
        //         stock : {
        //             [gt]: 0 
        //         }
        //     }
        // })
        Product.findAll()
        .then( data => {
            return res.status(200).json(data)
        })
        .catch ( err => {
            const errMsg = {
                name: "Internal Server Error",
                message: "Server Internal Error",
                status : 500,
            }
            return next(errMsg)
            // return res.status(500).json({ "message" : "internal server error"})
        })
    }

    static viewByPk(req,res, next){
        const selectedId = req.params.id
        Product.findByPk(selectedId)
        .then( data => {
            if(data == null){
                return res.status(404).json({ 
                    message: "data not found"
                })
            } else {
                return res.status(200).json(data)
            }
        })
        .catch ( err => {
            return res.status(500).json({ "message" : "internal server error"})
        })
    }

    static update(req,res, next){
        const selectedId = req.params.id

        let newData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock,
        }

        // console.log(newData, 'newData')

        if( newData.name == "" ){
            throw {
                name: "customErr",
                message: "name cannot be empty",
                status : 400,
            }
        } else if( newData.image_url == "" ){
            throw {
                name: "customErr",
                message: "image_url cannot be empty",
                status : 400,
            }
        } else if ( newData.price == "" ){
            throw {
                name: "customErr",
                message: "price cannot be empty",
                status : 400,
            }
        } else if( newData.stock == ""){
            throw {
                name: "customErr",
                message: "stock cannot be empty",
                status : 400,
            }
        }else if ( typeof newData.price != "number" || typeof newData.stock != "number" ){
            throw {
                name: "customErr",
                message: "Price and Stock must be a Number",
                status : 400,
            }
        } else if ( newData.price <= 0 || newData.stock <= 0 ){
            throw {
                name: "customErr",
                message: "Price and Stock must be more then 0",
                status : 400,
            }
        }

        Product.findByPk(selectedId)
        .then( data => {
            if ( data == null ) {
                    // console.log(data, "if atas")
                throw {
                    name: "customErr",
                    message: "data not found",
                    status : 404,
                }
            } else {
                    // console.log(data, "else if")

                data.update(newData)
                .then ( updatedRow => {
                    res.status(201).json(data)
                })
                .catch ( err =>{
                    next(err)
                })
            }
            // data.dataValues.createdAt = toString(data.dataValues.createdAt) 
            // data.dataValues.updatedAt = toString(data.dataValues.updatedAt)
            // console.log(data.dataValues,"data.dataValuesdata.dataValues")
            return res.status(200).json(data)
        })
        .catch ( err => {
            // const errMsg = {
            //     name: "Internal Server Error",
            //     message: "Server Internal Error",
            //     status : 500,
            // }
            return next(err)
            // return res.status(500).json({ "message" : "internal server error"})
        })
    }

    static delete(req,res, next){
        const selectedId = req.params.id
        Product.findByPk(selectedId)
        .then( data => {
            if(data == null){
                const errMsg = {
                    name: "customErr",
                    message: "data not found",
                    status : 404,
                }
                return next(errMsg)
                // return res.status(404).json({"message" : "data not found"})
            } else{
                data.destroy()
                .then( destroyedData => {
                    return res.status(200).json(data)
                })
                .catch ( err => {
                    const errMsg = {
                        name: "Internal Server Error",
                        message: "Server Internal Error",
                        status : 500,
                    }
                    return next(errMsg)
                    // return res.status(500).json({ "message" : "internal server error"})
                })
            }
        })
        .catch ( err => {
            // console.log(err,"err di controller")
            const errMsg = {
                name: "Internal Server Error",
                message: "Server Internal Error",
                status : 500,
            }
            return next(errMsg)
            // return res.status(500).json({"message" : "internal server error"})
        })
    }
}

module.exports = ProductsController