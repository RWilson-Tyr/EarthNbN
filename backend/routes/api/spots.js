const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ **COMPLETED** - Get all spots
router.get('/', async(req, res, next) => {
    try {
        let findSpots = await Spot.findAll()
        res.json({Spots: findSpots})
    } catch (error) {
        next(error)
    }
  });

  //READ **COMPLETED** - get all spots owned by current user
  router.get('/current',requireAuth, async(req, res, next) => {
    try {
        let findSpots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        res.json({Spots: findSpots})
    } catch (error) {
        next(error)
    }
  });

  //READ **COMPLETED** - get spot based on spot ID
router.get('/:spotId', async(req, res, next) => {
  try {
        const {spotId} = req.params
        let spots = await Spot.findAll({
            where: {
                id: spotId
            }
        })
        if(spots.length <= 0){
            throw new Error("Spot couldn't be found")
        }
        res.json({Spots: spots})

    } catch (err) {
        next(err)
    }
});

    //READ **UNFINISHED** - reviews based on SpotId
router.get('/:spotId/reviews', async(req, res, next)=>{
    try {
        let {spotId} = req.params
        let parseId = parseInt(spotId)
        let spotReviews = await Review.findAll({where: {spotId: parseId}})
        // console.log(spotReviews)
        res.json({Reviews: spotReviews})
    } catch (err) {
        
    }
})

//READ - all bookings based on SpotId
router.get('/:spotId/bookings', async(req, res, next)=>{
    try {
        res.json({message: "all bookings based on spotId"})
    } catch (err) {
        
    }
})

//CREATE **COMPLETED** - create a spot
router.post('/', requireAuth, async(req, res, next) => {
    try {
        const {address, city, state, country, lat, lng, name, description, price} = req.body
        let createSpot = await Spot.create({address, city, state, country, lat, lng, name, description, price, ownerId : req.user.id})
        res.json(createSpot)
    } catch (error) {
        next(error)
    }
  });

  //CREATE **COMPLETED** - Add an image to spotId
router.post('/:spotId/spotimages', requireAuth, async(req, res, next)=>{
    try {
        const {url, preview} = req.body
        let spotId = req.params.spotId
        const findSpot = await Spot.findOne({
            where: {
                id: spotId
            }
        })
        if(req.user.id !== findSpot.ownerId){throw new Error("You don't own this Spot")}
        if(findSpot === null){throw new Error("Spot couldn't be found")}
        const createImage = await SpotImage.create({spotId, url, preview})
        let id = createImage.id

        res.json({id, url, preview})
    } catch (err) {
        next(err)
    }
})


//CREATE - review based on SpotId
router.post('/:spotId/reviews', async(req, res, next)=>{
    try {
        res.json({message: "hello"})
    } catch (err) {
        
    }
})

//CREATE - booking based on SpotId
router.post('/:spotId/bookings', async(req, res, next)=>{
    try {
        res.json({message: "Create booking"})
    } catch (err) {
        
    }
})

//UPDATE **COMPLETED**
router.put('/:spotId', requireAuth, async(req, res, next) => {
    try {
        const { user } = req
        const {spotId} = req.params
        const {address, city, state, country, lat, lng, name, description, price} = req.body
        let updateSpot = await Spot.findOne({where: {id: spotId}})
        if(updateSpot === null){throw new Error("Spot couldn't be found")}
        if(updateSpot.ownerId === user.id){
        await updateSpot.update({address, city, state, country, lat, lng, name, description, price})
        res.json(updateSpot)}
    } catch (error) {
        next(error)
    }
  });

//DELETE **COMPLETED**
router.delete('/:spotId',requireAuth, async(req, res, next) => {
    try {
        const {user} = req
        const {spotId} = req.params
        let deleteSpot = await Spot.findByPk(spotId)
        if(deleteSpot === null){ throw new Error("Spot couldn't be found")}
        if(user.id === deleteSpot.ownerId){
        await deleteSpot.destroy()
        res.json({message: "Successfully deleted"})
    }
    } catch (error) {
        next(error)
    }
  });


module.exports = router
