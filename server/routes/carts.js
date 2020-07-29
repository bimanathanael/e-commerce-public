const router = require('express').Router()
const cartsController = require('../controllers/cartsController')
const { authentication, authorizationCust } = require('../middlewares/auth')

router.use(authentication)

router.get('/', cartsController.viewCart)
router.get('/transactionHist', cartsController.viewtransactionHist)
router.post('/', cartsController.add)
router.put('/', cartsController.checkOut)
router.delete('/:cartId',authorizationCust, cartsController.deleteCart)


module.exports = router