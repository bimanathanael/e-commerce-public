const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { Product, Cart, User } = require ('../models')
const doMail = require('../helpers/mail')


class CartsController{
    static add(req,res, next){
        let newOne = {
            UserId: req.userData.id,
            ProductId: req.body.ProductId,
            isPaid: false,
            qty: +req.body.qty,
        }
        Cart.findOne({
            where: { 
                UserId: req.userData.id,
                ProductId: req.body.ProductId,
                isPaid: "false"
            }
        })
        .then( data => {
            if(data === null){
                Cart.create(newOne)
                .then( result => {
                    return res.status(201).json(result)
                })
                .catch ( err => {
                    return res.status(500).json(err)
                })
            } else {
                data.qty = +data.qty + newOne.qty
                data.save()
                return res.status(201).json({message: "done add to cart!"})
            }
        })
        .catch( err => {
            return res.status(500).json(err)
        })
    }

    static viewCart(req,res, next){
        console.log("req.userData.id",req.userData.id)
        Cart.findAll({
            where: {
                UserId: req.userData.id,
                isPaid: "false"
            },
            include: ["User", "Product"],
        })
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

    static viewtransactionHist(req,res, next){
        Cart.findAll({
            where: {
                UserId: req.userData.id,
                isPaid: "true"
            },
            include: ["User", "Product"],
        })
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

    static checkOut(req,res, next){
        Cart.findAll({
            where: {
                UserId: req.userData.id,
                isPaid: "false"
            }
        })
        .then( allProducts => {
            Cart.update({ isPaid: "true" },{
                where: {
                    UserId: req.userData.id,
                    isPaid: "false"
                }
            })
            .then( data => {
                allProducts.forEach(product => {
                    Product.decrement({ stock: product.dataValues.qty}, {where: { id: product.dataValues.ProductId}})
                    .then( data => {
                        console.log('success decrement product')
                    })
                    .catch ( err => {
                        return next(err)
                    })
                });
                const email = {
                    title: "Your Cart has been Checkout!",
                    body: `
                    You have successfully checkout your cart!

                    Please wait to ship right infront of your front door.
                    Thankyou for shopping with US :)

                    Warm regards,

                    E-Commerce Admin by Bima
                    `
                };
                doMail(email);
                console.log('lewat mail')
                return res.status(200).json({data, message: "Done Checkout, an email had been sent please check!"})
            })
            .catch ( err => {
                return next(err)
            })
        })
        .catch ( err => {
            return next(err)
        })
    }

    static deleteCart(req,res, next){
        const selectedId = req.params.cartId
        Cart.destroy({where: { id: selectedId }})
        .then( data => {
            if(!data){
                return res.status(404).json({ "message" : "no data found"})
            } else {
                return res.status(200).json({ "message" : "cart successfully deleted"})
            }
        })
        .catch ( err => {
            return res.status(500).json({ "message" : "internal server error"})
        })
    }

}

module.exports = CartsController