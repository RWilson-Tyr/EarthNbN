const express = require('express');
const { Booking, User, Spot } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");

const router = express.Router();

//READ **INCOMPLETE** - all current user bookings
//missing previewImg on Spot
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        let reqUser = parseInt(req.user.id)
        const findAll = await Booking.findAll({where: {userId: reqUser}, include:[{model: Spot, attributes: {exclude: ['description', 'createdAt', 'updatedAt']}}]})
        res.json({Bookings : findAll})
    } catch (err) {
        next(err)
    }
})

//UPDATE **INCOMPLETE** - booking based on booking Id
//Major Problems
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    try {
        let { startDate, endDate } = req.body
        // console.log(parse)
        // if(startDate > new Date() || endDate > new Date()){throw new Error("Past bookings can't be modified")}
        const findBooking = await Booking.findOne({ where: { id: req.params.bookingId } })
        if(!findBooking){throw new Error("This booking does not exist!")}
        const updateBooking = await findBooking.update({ startDate, endDate })
        res.json(updateBooking)
    } catch (err) {
        next(err)
    }
})

//DELETE **COMPLETE** - booking by booking ID
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    try {
        const bookingId = parseInt(req.params.bookingId)
        let findBooking = await Booking.findByPk(bookingId)
        if(findBooking.length === 0){throw new Error("Booking does not exist!")}
        if(findBooking.userId !== req.user.id){throw new Error('Forbidden')}

        await Booking.destroy({where: {id: bookingId}})
        res.json({ message: "Successfully deleted" })
    } catch (err) {
        next(err)
    }
})

module.exports = router
