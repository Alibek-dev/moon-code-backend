const Router = require('express')
const router = Router()
const TestController = require('../controllers/testController')
const {check} = require('express-validator')
const validationMiddleware = require('../middlewaree/validationMiddleware')

router.get('/tests', TestController.getTestsByTaskId)
router.get('/test')
router.post('/test', [
    check("input", "Входные данные обязательны").trim().notEmpty(),
    check("output", "Выходные данные обязательны").trim().notEmpty(),
    validationMiddleware
], TestController.createTest)
router.put('/test', [
    check("input", "Входные данные обязательны").trim().notEmpty(),
    check("output", "Выходные данные обязательны").trim().notEmpty(),
    validationMiddleware
], TestController.updateTest)
router.delete('/test', TestController.deleteTest)

module.exports = router

