const Router = require('express')
const router = Router()
const {check} = require('express-validator')
const validationMiddleware = require('../middlewaree/validationMiddleware')
const parcelController = require('../controllers/parcelController')

router.get('/parcels', )
router.get('/parcel', )
router.post('/parcel', [

], parcelController.testingCode)

module.exports = router
