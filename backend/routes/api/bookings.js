const express = require('express');
const { Booking } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ **INCOMPLETE** - all current user bookings
router.get('/', async (req, res, next) => {
    try {
        const findAll = await Booking.findAll({})
        res.json(findAll)
    } catch (err) {
        next(err)
    }
})

//UPDATE **INCOMPLETE** - booking based on booking Id
router.put('/:bookingId', async (req, res, next) => {
    try {
        let { startDate, endDate } = req.body
        const findBooking = await Booking.findOne({ where: { id: req.params.bookingId } })
        const updateBooking = await findBooking.update({ startDate, endDate })
        res.json(updateBooking)
    } catch (err) {
        next(err)
    }
})

//DELETE **INCOMPLETE** - booking by booking ID
router.delete('/:bookingId', async (req, res, next) => {
    try {
        let deleteBooking = await Booking.findOne({ where: { id: req.params.bookingId } })
        await deleteBooking.destroy()
        res.json({ message: "update booking" })
    } catch (err) {
        next(err)
    }
})

module.exports = router
