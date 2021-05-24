const Parcel = require('../models/Parcel')

const ivm = require('isolated-vm');

class ParcelController {
    async testingCode(req, res) {
        try {


            return res.status(200).json("Хоп")
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
}

module.exports = new ParcelController
