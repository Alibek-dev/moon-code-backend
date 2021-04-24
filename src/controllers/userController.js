const User = require('../models/User')

class UserController {
    async getUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.json(users)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
    async getUserProfile(req, res) {
        try {
            console.log(req.user)
            const user = await User.findByPk(req.user.id)
            if (!user) {
                return res.status(404).json({message: `Такой пользователь с id: ${req.query.id} не существует`})
            }
            return res.status(200).json(user)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
}

module.exports = new UserController
