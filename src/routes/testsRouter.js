const Router = require('express')
const router = Router()
const TestController = require('../controllers/testController')
const {check} = require('express-validator')
const validationMiddleware = require('../middlewaree/validationMiddleware')

router.get('/tests')
router.get('/test')
router.post('/test', TestController.createTest)
router.put('/test')
router.delete('/test')

module.exports = router

