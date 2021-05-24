const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../../config')

const generateAccessToken = (id, username, password) => {
    const payload = {id, username, password}
    return jwt.sign(payload, secret)
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password, firstName, secondName, patronymic} = req.body
            const candidate = await User.findOne({where: {username}})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким логином уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 8)
            let user = await User.create({firstName, secondName, patronymic, username, password: hashPassword})

            delete user.dataValues.password
            user.dataValues.token = await generateAccessToken(user.id, user.username, user.password)

            return res.json({message: "Пользователь успешно зарегестрирован", user })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({where: {username}})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.username, user.password)
            return res.json({token})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new AuthController
