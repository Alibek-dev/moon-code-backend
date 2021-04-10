const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewaree/authMiddleware')

router.post('/registration',[
    check('username', "Логин пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть не меньше 4 символов").isLength({min: 4, max: 255})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router
