const Router = require('express')
const router = Router()
const TaskController = require('../controllers/taskController')
const {check} = require('express-validator')
const validationMiddleware = require('../middlewaree/validationMiddleware')

router.get('/task/', TaskController.getTaskById)
router.get('/tasks', TaskController.getAllTasks)
router.get('/tasks/parcels', TaskController.getAllTasksWithParcels)

router.post('/task', [
    check("title", "Заголовок задачи не должен быть пустым").trim().notEmpty(),
    check("text", "Условие задачи не должно быть пустым").trim().notEmpty(),
    validationMiddleware
], TaskController.createTask)

router.put('/task', [
    check("title", "Заголовок задачи не должен быть пустым").trim().notEmpty(),
    check("text", "Условие задачи не должно быть пустым").trim().notEmpty(),
    validationMiddleware
], TaskController.updateTask)
router.delete('/task/', TaskController.deleteTask)

router.put('/task/rating', TaskController.setRaiting)

router.put('/task/favorite', TaskController.setFavorite)

module.exports = router

