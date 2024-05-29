const express = require('express');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');
const reviewimage = require('../../db/models/reviewimage.js');

const router = express.Router();

//READ **INCOMPLETE**(missing previewImage and avgRating) - Get all spots
router.get('/', async (req, res, next) => {
    try {
        let findSpots = await Spot.findAll({
            include: {model: SpotImage}
        })
        res.json({ Spots: findSpots })
    } catch (error) {
        next(error)
    }
});

//READ **INCOMPLETE**(missing previewImage and avgRating) - get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        let findSpots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        res.json({ Spots: findSpots })
    } catch (error) {
        next(error)
    }
});

//READ **COMPLETED** - get spot based on spot ID
router.get('/:spotId', async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId)
        let ownerId = req.user.id
        let spots = await Spot.findAll({
            where: {id: spotId},
            include: [{
                model: SpotImage,
                where: { spotId }
            },{
                model: User,
                as: 'Owner',
                where: {id: ownerId}
            },]
        })
        if (!spots) { throw new Error("Spot couldn't be found") }
        res.json(...spots)

    } catch (err) {
        next(err)
    }
});

//READ **UNFINISHED** - reviews based on SpotId
router.get('/:spotId/reviews', async (req, res, next) => {
    try {
        let spotId = parseInt(req.params.spotId)
        let spotReviews = await Review.findAll({ where: spotId,
            include: [{model: User},{model: ReviewImage}]
        })
        res.json({ Reviews: spotReviews })
    } catch (err) {
        next(err)
    }
})

//READ **INCOMPLETE** - all bookings based on SpotId
router.get('/:spotId/bookings', async (req, res, next) => {
    try {
        let spotId = parseInt(req.params.spotId)
        let findAll = await Booking.findAll({ where: spotId, include: {model: User} })
        if(!findAll){throw new Error("no bookings found for this spot!")}
        res.json({Bookings: findAll})
    } catch (err) {
        next(err)
    }
})

//CREATE **COMPLETED** - create a spot
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        let createSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id })
        res.json(createSpot)
    } catch (error) {
        next(error)
    }
});

//CREATE **COMPLETED** - Add an image to spotId
router.post('/:spotId/spotimages', requireAuth, async (req, res, next) => {
    try {
        const { url, preview } = req.body
        const spotId = parseInt(req.params.spotId)
        const findSpot = await Spot.findByPk(spotId)
        if (!findSpot) { throw new Error("Spot couldn't be found") }
        if (req.user.id !== findSpot.ownerId) { throw new Error("You don't own this Spot") }        
        const createImage = await SpotImage.create({ spotId, url, preview })
        let id = createImage.id
        res.json({ id, url, preview })
    } catch (err) {
        next(err)
    }
})


//CREATE **INCOMPLETE** - review based on SpotId
router.post('/:spotId/reviews', async (req, res, next) => {
    try {
        const { review, stars } = req.body
        const spotId = parseInt(req.params.spotId)
        let findSpot = await Spot.findByPk(spotId)
        if(!findSpot){throw new Error("Spot couldn't be found")}
        let createReview = await Review.create({ spotId: spotId, userId: req.user.id, review, stars })
        res.json(createReview)
    } catch (err) {
        next(err)
    }
})

//CREATE **INCOMPLETE** - booking based on SpotId
router.post('/:spotId/bookings', async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body
        const spotId = parseInt(req.params.spotId)
        let findSpot = await Spot.findByPk(spotId)
        if(!findSpot){throw new Error("Spot couldn't be found")}
        let createBooking = await Booking.create({ spotId, userId: req.user.id, startDate, endDate })
        res.json(createBooking)
    } catch (err) {
        next(err)
    }
})

//UPDATE **COMPLETED**
router.put('/:spotId', requireAuth, async (req, res, next) => {
    try {
        const { user } = req
        const { spotId } = req.params
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        let updateSpot = await Spot.findOne({ where: { id: spotId } })
        if (updateSpot === null) { throw new Error("Spot couldn't be found") }
        if (updateSpot.ownerId === user.id) {
            await updateSpot.update({ address, city, state, country, lat, lng, name, description, price })
            res.json(updateSpot)
        }
    } catch (error) {
        next(error)
    }
});

//DELETE **COMPLETED**
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    try {
        const { user } = req
        const spot = parseInt(req.params.spotId)
        let deleteSpot = await Spot.findByPk(spot)
        if (deleteSpot === null) { throw new Error("Spot couldn't be found") }
        if(user.id === deleteSpot.ownerId){
            await Spot.destroy({where: {id: spot}})
            res.json({ message: "Successfully deleted" })
        }
    } catch (error) {
        next(error)
    }
});


module.exports = router
