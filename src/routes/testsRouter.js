const Router = require('express')
const router = Router()
const TestController = require('../controllers/testController')
const {check} = require('express-validator')
const validationMiddleware = require('../middlewaree/validationMiddleware')
const checkArray = require('../middlewaree/checkArray')

router.get('/tests', TestController.getTestsByTaskId)
router.get('/test')
router.post('/test', [
    checkArray,
    validationMiddleware
], TestController.createTest)
router.put('/test', [
    checkArray,
    validationMiddleware
], TestController.updateTest)
router.delete('/test', TestController.deleteTest)

module.exports = router

