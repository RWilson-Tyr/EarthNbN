const express = require('express');
const { Booking, User, Spot } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");

const router = express.Router();

//READ **INCOMPLETE** - all current user bookings
//missing previewImg on Spot
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        let reqUser = parseInt(req.user.id)
        const findAll = await Booking.findAll({where: {userId: reqUser} , include:[{model: Spot, attributes: {exclude: ['description', 'createdAt', 'updatedAt']}}]})
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
        if(!findBooking){throw new Error("Booking couldn't be found")}
        if(req.user.id !== findBooking.userId){throw new Error("Forbidden")}
        const updateBooking = await findBooking.update({ startDate, endDate })
        res.json(updateBooking)
    } catch (err) {
        if(err.message === "Booking couldn't be found"){err.status = 404}
        next(err)
    }
})

//DELETE **COMPLETE** - booking by booking ID
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    try {
        const bookingId = parseInt(req.params.bookingId)
        let findBooking = await Booking.findByPk(bookingId)
        if(!findBooking){throw new Error("Booking couldn't be found")}
        if(findBooking.userId !== req.user.id){throw new Error('Forbidden')}

        await Booking.destroy({where: {id: bookingId}})
        res.json({ message: "Successfully deleted" })
    } catch (err) {
        if(err.message === "Booking couldn't be found"){err.status = 404}
        next(err)
    }
})

module.exports = router
