const router = require('express').Router()
const productsController = require('../controllers/productsController')
const { authentication, authorizationAdmin } = require('../middlewares/auth')



router.get('/', productsController.view)
router.get('/:id', productsController.viewByPk)

router.use(authentication)
router.use(authorizationAdmin)
router.post('/', productsController.add)
router.put('/:id', productsController.update)
router.delete('/:id', productsController.delete)


module.exports = router