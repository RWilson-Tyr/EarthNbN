const express = require('express');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');
const { requireAuth, spotReturn } = require("../../utils/auth.js");
// const { spotReturn } = require("../../utils/auth.js");

const router = express.Router();
const today = new Date()


//READ - Get all spots
router.get('/', async (req, res, next) => {

    try {
        let array = []
        const findSpots = await Spot.findAll({
            // include: {model: SpotImage, attributes: ["url"]}

        })
        let totalStars = 0;
        let totalReviews = 0;
        for(spot of findSpots){
            let findReviews = await Review.findAll({where: {spotId : spot.id}})
            let findImg = await SpotImage.findAll({where: {spotId: spot.id, preview: 1}})

                for(review of findReviews){ totalStars += review.stars, totalReviews++}

            let avgRating = totalStars/totalReviews

            spot.previewImage = findImg
            spot.dataValues.avgRating = avgRating
            spot.dataValues.previewImage = findImg[0].url
            array.push(spot)
            totalStars = 0;
            totalReviews = 0;
        }
        res.json({ Spots: array })
    } catch (error) {
        next(error)
    }
});

//READ - get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        let array = []
        let findSpots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        let totalStars = 0;
        let totalReviews = 0;
        for(spot of findSpots){
            let findReviews = await Review.findAll({where: {spotId : spot.id}})
            let findImg = await SpotImage.findAll({where: {spotId: spot.id, preview: 1}})

                for(review of findReviews){ totalStars += review.stars, totalReviews++}

            let avgRating = totalStars/totalReviews
            if(findReviews[0] === undefined){avgRating = 0}

            spot.previewImage = findImg
            spot.dataValues.avgRating = avgRating
            spot.dataValues.previewImage = findImg[0].url
            array.push(spot)
            totalStars = 0;
            totalReviews = 0;
        }
        res.json({ Spots: array })
    } catch (error) {
        next(error)
    }
});

//READ - get spot based on spot ID
router.get('/:spotId', async (req, res, next) => {
    try {
        let spotId = parseInt(req.params.spotId)
        let ownerId = req.user.id
        let spots = await Spot.findOne({
            where: {id: spotId},
            include: [{
                model: SpotImage,
                where: { spotId },
                attributes: {exclude: ['spotId', 'updatedAt', 'createdAt']}
            },{
                model: User,
                as: 'Owner',
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}
            },]
        })
        if(!spots){throw new Error("Spot couldn't be found")}
        let totalStars = 0;
        let numReviews = 0;
        let countReviews = await Review.findAll({where: {spotId: spotId}})
            for(review of countReviews){
                numReviews++
                totalStars += review.stars
            }
        spots.dataValues.numReviews = numReviews
        spots.dataValues.avgStarRating = totalStars/numReviews
        if(isNaN(spots.dataValues.avgStarRating)){spots.dataValues.avgStarRating = 0}


        res.json(spots)
    } catch (err) {
        next(err)
    }
});

//READ - reviews based on SpotId
router.get('/:spotId/reviews', async (req, res, next) => {
    try {
        let spotId = parseInt(req.params.spotId)
        let spotReviews = await Review.findAll({ where: spotId,
            include: [
                {model: User, attributes: {exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}},
                {model: ReviewImage, attributes: {exclude: ['reviewId', 'createdAt', 'updatedAt']}}]
        })
        let findSpot = await Spot.findOne({where: spotId })
        if(!findSpot){throw new Error("Spot couldn't be found")}
        res.json({ Reviews: spotReviews })
    } catch (err) {
        next(err)
    }
})

//READ - all bookings based on SpotId
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        let reqUser = parseInt(req.user.id)
        let spotId = parseInt(req.params.spotId)
        let isSpot = await Spot.findByPk(spotId)
        if(!isSpot){throw new Error("Spot couldn't be found")}
        let ownerFindAll = await Booking.findAll({ where: {spotId}, include: {model: User, attributes: {exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}}})
        let findAll = await Booking.findAll({where: {spotId},attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']}})
        if(!findAll){throw new Error("no bookings found for this spot!")}
        if(reqUser === isSpot.ownerId){
        res.json({Bookings: ownerFindAll})}
        else {
            res.json({Bookings: findAll})
        }
    } catch (err) {
        next(err)
    }
})

//CREATE - create a spot
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        let createSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id})
        res.status(201)
        res.json(createSpot)
    } catch (error) {
        error.status = 400
        error.message = "Validation error"
        for (let err of error.errors) {
            if(err.path === 'address'){err.message = "Street address is required"}
            if(err.path === 'city'){err.message = "City is required"}
            if(err.path === 'state'){err.message = "State is required"}
            if(err.path === 'country'){err.message = "Country is required"}
            if(err.path === 'lat'){err.message = "latitude is not valid"}
            if(err.path === 'lng'){err.message = "Longitude is not valid"}
            if(err.path === 'name'){err.message = "Name must be less than 50 characters"}
            if(err.path === 'description'){err.message = "Description is required"}
            if(err.path === 'price'){err.message = "Price per day is required"}
          }
        next(error)
    }
});

//CREATE - Add an image to spotId
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    try {
        const { url, preview } = req.body
        const spotId = parseInt(req.params.spotId)
        const findSpot = await Spot.findByPk(spotId)
        if (!findSpot) { throw new Error("Spot couldn't be found") }
        if (req.user.id !== findSpot.ownerId) {throw new Error('Forbidden')}        
        const createImage = await SpotImage.create({ spotId, url, preview })
        let id = createImage.id
        res.status(200)
        res.json({ id, url, preview })
    } catch (err) {
        err.status = 404
        next(err)
    }
})


//CREATE - review based on SpotId
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    try {
        const { review, stars } = req.body
        const spotId = parseInt(req.params.spotId)
        let findSpot = await Spot.findByPk(spotId)
        if(!findSpot){throw new Error("Spot couldn't be found")}
        let createReview = await Review.create({ spotId: spotId, userId: req.user.id, review, stars })
        res.status(201)
        let finRev = {id: createReview.id, userId: req.user.id, spotId: spotId, review: review, stars: stars, createdAt: createReview.createdAt, updatedAt: createReview.updatedAt}
        res.json(finRev)
    } catch (err) {
        err.status = 400
        next(err)
    }
})

//CREATE - booking based on SpotId
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body
        if(startDate < today.toISOString().slice(0, 10)){throw new Error("startDate cannot be before today's date")}
        if(endDate < today.toISOString().slice(0, 10)){throw new Error("endDate cannot be before today's date")}
        if(endDate < startDate){throw new Error("endDate is before startDate")}
        const spotId = parseInt(req.params.spotId)
        let findSpot = await Spot.findByPk(spotId)
        let allBookings = await Booking.findAll({ where: { spotId } })
        if(!findSpot){throw new Error("Spot couldn't be found")}
        if(findSpot){
            for (book of allBookings){
                let currBookingStart = book.startDate.toISOString().slice(0, 10)
                let currBookingEnd = book.endDate.toISOString().slice(0, 10)
                    if(currBookingStart <= startDate && startDate <= currBookingEnd){
                        throw new Error("Booking already scheduled for this time. StartDate falls in a previous booking")
                    }
                    if(currBookingStart <= endDate && endDate <= currBookingEnd){
                        throw new Error("Booking already scheduled for this time. EndDate falls in a previous booking")
                    }
                    if(startDate < currBookingStart && endDate > currBookingEnd){
                        throw new Error("There is already a booking scheduled within this timeframe.")
                    }
                    if(startDate === currBookingStart || endDate === currBookingEnd){
                        throw new Error("There is already a booking scheduled within this timeframe.")
                    }
            }}
        let createBooking = await Booking.create({ spotId, userId: req.user.id, startDate, endDate })
        let finBooking = {id: createBooking.id, spotId, userId: req.user.id, startDate, endDate, createdAt: createBooking.createdAt, updatedAt: createBooking.updatedAt}
        
        res.status(201).json(finBooking)
    } catch (err) {
        if(err.message === "startDate cannot be before today's date"){err.status = 404}
        if(err.message === "endDate cannot be before today's date"){err.status = 404}
        if(err.message === "Booking already scheduled for this time. StartDate falls in a previous booking"){err.status = 403}
        if(err.message === "Booking already scheduled for this time. EndDate falls in a previous booking"){err.status = 403}
        if(err.message === "endDate is before startDate"){err.status = 404}
        if(err.message === "There is already a booking scheduled within this timeframe."){err.status = 403}
        next(err)
    }
})

//UPDATE
router.put('/:spotId', requireAuth, async (req, res, next) => {
    try {
        const reqUser = req.user.id
        const spotId = parseInt(req.params.spotId)
        if(isNaN(spotId)){throw new Error(`You have input /api/spots/${req.params.spotId}. ${req.params.spotId} is not a number`)}
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        let updateSpot = await Spot.findOne({ where: { id: spotId } })
        if (updateSpot === null) {
            throw new Error("Spot couldn't be found") 
        }
        if (updateSpot.ownerId === reqUser) {
            await updateSpot.update({ address, city, state, country, lat, lng, name, description, price })
            res.json(updateSpot)
        }
        if (updateSpot.ownerId !== reqUser){throw new Error('Forbidden')} 
    } catch (error) {
        if(error.message === "Spot couldn't be found"){next(error)}
        if(error.message === "Forbidden"){next(error)}
        for (let err of error.errors) {
            if(err.path === 'address'){err.message = "Street address is required"}
            if(err.path === 'city'){err.message = "City is required"}
            if(err.path === 'state'){err.message = "State is required"}
            if(err.path === 'country'){err.message = "Country is required"}
            if(err.path === 'lat'){err.message = "latitude is not valid"}
            if(err.path === 'lng'){err.message = "Longitude is not valid"}
            if(err.path === 'name'){err.message = "Name must be less than 50 characters"}
            if(err.path === 'description'){err.message = "Description is required"}
            if(err.path === 'price'){err.message = "Price per day is required"}
          }
          error.status = 400
          error.message = "Validation error"
        next(error)
    }
});

//DELETE
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
        if(user.id !== deleteSpot.ownerId){throw new Error('Forbidden')}
    } catch (error) {
        next(error)
    }
});


module.exports = router
