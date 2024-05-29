const express = require('express');
const { Booking, User, Spot } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ **INCOMPLETE** - all current user bookings
router.get('/current', async (req, res, next) => {
    try {
        const findAll = await Booking.findAll({include:[{model: Spot}]})
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
        if(!findBooking){throw new Error("This booking does not exist!")}
        const updateBooking = await findBooking.update({ startDate, endDate })
        res.json(updateBooking)
    } catch (err) {
        next(err)
    }
})

//DELETE **COMPLETE** - booking by booking ID
router.delete('/:bookingId', async (req, res, next) => {
    try {
        const bookingId = parseInt(req.params.bookingId)
        let findBooking = await Booking.findByPk(bookingId)
        if(findBooking.length === 0){throw new Error("Booking does not exist!")}
        if(findBooking.userId !== req.user.id){throw new Error("This is not your booking!")}

        await Booking.destroy({where: {id: bookingId}})
        res.json({ message: "Successfully deleted" })
    } catch (err) {
        next(err)
    }
})

module.exports = router
