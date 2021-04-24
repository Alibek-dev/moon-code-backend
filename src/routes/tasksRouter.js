const Router = require('express')
const router = Router()
const TaskController = require('../controllers/taskController')
const {check} = require('express-validator')
const validationMiddleware = require('../middlewaree/validationMiddleware')

router.get('/task/', TaskController.getTaskById)
router.get('/tasks', TaskController.getAllTasks)

router.post('/task', [
    check("text", "Условие задачи не должно быть пустым").trim().notEmpty(),
    check("inputDataText", "Условие входных данных не должно быть пустым").trim().notEmpty(),
    check("outputDataText", "Условие выходных данных не должно быть пустым").trim().notEmpty(),
    validationMiddleware
], TaskController.createTask)

router.put('/task', [
    check("text", "Условие задачи не должно быть пустым").trim().notEmpty(),
    check("inputDataText", "Условие входных данных не должно быть пустым").trim().notEmpty(),
    check("outputDataText", "Условие выходных данных не должно быть пустым").trim().notEmpty(),
    validationMiddleware
], TaskController.updateTask)
router.delete('/task/', TaskController.deleteTask)

module.exports = router

