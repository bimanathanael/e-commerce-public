const router = require('express').Router()
const mainController = require('../controllers/mainController')
const products = require('./products')
const carts = require('./carts')
const errHandler = require('../middlewares/errHandler')

router.post('/login', mainController.login)
router.post('/registerCust', mainController.registerCust)
router.use('/products', products)
router.use('/carts', carts)
router.use(errHandler)

module.exports = router