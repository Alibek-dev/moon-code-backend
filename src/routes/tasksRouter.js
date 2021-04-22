const Router = require('express')
const router = Router()
const TaskController = require('../controllers/taskController')
const {check} = require('express-validator')

router.get('/task/', TaskController.getTaskById)
router.get('/tasks', TaskController.getAllTasks)
router.post('/task', [
    check("text", "Условие задачи не должно быть пустым").trim().notEmpty(),
    check("inputDataText", "Условие входных данных не должно быть пустым").trim().notEmpty(),
    check("outputDataText", "Условие выходных данных не должно быть пустым").trim().notEmpty()
], TaskController.createTask)
router.put('/task', TaskController.updateTask)
router.delete('/task/')

module.exports = router

