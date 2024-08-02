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
        const bookingId = parseInt(req.params.bookingId)
        const findBooking = await Booking.findByPk(bookingId)
        if(!findBooking){throw new Error("Booking couldn't be found")}
        if(req.user.id !== findBooking.userId){throw new Error("Forbidden")}
        let findAllBooking = await Booking.findAll({where: {spotId: findBooking.spotId}})
        if(findBooking){
            for(book of findAllBooking){
                let bookedStart = book.startDate.toISOString().slice(0, 10);
                let bookedEnd = book.endDate.toISOString().slice(0, 10);
                if(bookedStart <= startDate && startDate <= bookedEnd){
                    throw new Error("Booking already scheduled for this time. StartDate falls in a previous booking")
                }
                if(bookedStart <= endDate && endDate <= bookedEnd){
                    throw new Error("Booking already scheduled for this time. EndDate falls in a previous booking")
                }
                if(startDate < bookedStart && endDate > bookedEnd){
                    throw new Error("There is already a booking scheduled within this timeframe.")
                }
                if(startDate === bookedStart || endDate === bookedEnd){
                    throw new Error("There is already a booking scheduled within this timeframe.")
                }
            }
        }
        const updateBooking = await findBooking.update({ startDate, endDate })
        res.json(updateBooking)
    } catch (err) {
        if(err.message === "Booking couldn't be found"){err.status = 404}
        else{err.status = 404}
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
