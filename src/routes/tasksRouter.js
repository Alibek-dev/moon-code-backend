const Router = require('express')
const router = Router()
const TaskController = require('../controllers/taskController')
const authMiddleware = require('../middlewaree/authMiddleware')
const {check} = require('express-validator')

router.get('/task/:id')
router.get('/tasks')
router.post('/task', [
    authMiddleware,
    check("text", "Условие задачи не должно быть пустым").trim().notEmpty(),
    check("inputDataText", "Условие входных данных не должно быть пустым").trim().notEmpty(),
    check("outputDataText", "Условие выходных данных не должно быть пустым").trim().notEmpty()
], TaskController.createTask)
router.put('/task')
router.delete('/task/:id')

module.exports = router

