const express = require('express');
const { Spot } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ
router.get('/', async(req, res, next) => {
    try {
        let findSpots = await Spot.findAll()
        res.json({Spots: findSpots})
    } catch (error) {
        next(error)
    }
  });

  router.get('/current',requireAuth, async(req, res, next) => {
    try {
        const {user} = req
        let findSpots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
        res.json({Spots: findSpots})
    } catch (error) {
        next(error)
    }
  });

  router.get('/:spotId', async(req, res, next) => {
    try {
        const {spotId} = req.params
        let spots = await Spot.findAll({
            where: {
                id: spotId
            }
        })
        if(spots.length <= 0){throw new CustomErrHandler(404, "hello")}
            res.json({spots})
    } catch (err) {
        next(err)
    }});

//CREATE
router.post('/', requireAuth, async(req, res, next) => {
    try {
        const {address, city, state, country, lat, lng, name, description, price} = req.body
        let createSpot = await Spot.create({address, city, state, country, lat, lng, name, description, price, ownerId : user})
        res.json(createSpot)
    } catch (error) {
        next(error)
    }
  });

//UPDATE
router.put('/:spotId', requireAuth, async(req, res, next) => {
    try {
        const { user } = req
        const {id} = req.params
        const {address, city, state, country, lat, lng, name, description, price} = req.body
        let updateSpot = await Spot.findOne({where: id})
        
        if(updateSpot.ownerId === user){
        await updateSpot.update({address, city, state, country, lat, lng, name, description, price})
        res.json(updateSpot)} else {res.json({message: "spot update failure"})}
        
    } catch (error) {
        next(error)
    }
  });

//DELETE
router.delete('/:spotId',requireAuth, async(req, res, next) => {
    try {
        const {user} = req
        const {spotId} = req.params
        let deleteSpot = await Spot.findByPk(spotId)
        if(user.id === deleteSpot.ownerId){
        await deleteSpot.destroy()
        res.json(deleteSpot)
    }
    } catch (error) {
        next(error)
    }
  });


module.exports = router
