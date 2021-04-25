const Router = require('express')
const router = Router()
const UserController = require('../controllers/userController')

router.get('/users', UserController.getUsers)
router.get('/user', UserController.getUserById)
router.get('/profile', UserController.getUserProfile)

module.exports = router
