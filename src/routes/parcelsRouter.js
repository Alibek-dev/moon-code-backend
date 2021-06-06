const Router = require('express')
const router = Router()
const parcelController = require('../controllers/parcelController')

router.get('/parcels', parcelController.getAllParcels)
router.get('/parcel', parcelController.getParcel)
router.post('/parcel', [

], parcelController.testingCode)

module.exports = router
