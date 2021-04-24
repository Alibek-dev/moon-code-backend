const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')

router.post('/registration',[
    check('username', "Логин пользователя не может быть пустым").trim().notEmpty(),
    check('password', "Пароль должен быть не меньше 4 символов").isLength({min: 4, max: 255})
], controller.registration)
router.post('/login', controller.login)

module.exports = router
