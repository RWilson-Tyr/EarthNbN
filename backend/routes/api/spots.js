const express = require('express');
const { Spot } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js")

const router = express.Router();

//READ
router.get('/', async(req, res) => {
    try {
        let spots = await Spot.findAll()
        res.json({spots})
    } catch (error) {
        //custom error handler scheduled
        return console.log(error)
    }
  });

  router.get('/current', async(req, res) => {
    try {
        const { user } = req
        requireAuth(req)
        if(user){
        let spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
        res.json({spots})}
    } catch (error) {
        //custom error handler scheduled
        return console.log(error)
    }
  });

  router.get('/:spotId', async(req, res) => {
    try {
        const {spotId} = req.params
        let spots = await Spot.findAll({
            where: {
                id: spotId
            }
        })
        if(spots.length >0)
        {res.json({spots})}
    } catch (error) {
        //custom error handler scheduled
        return console.log(error)
    }
  });

//CREATE
router.post('/', async(req, res) => {
    try {
        const { user } = req
        const {address, city, state, country, lat, lng, name, description, price} = req.body
        if(user){
        let createSpot = await Spot.create({address, city, state, country, lat, lng, name, description, price, ownerId : user})
        res.json(createSpot)}
    } catch (error) {
        //custom error handler scheduled
        return console.log(error)
    }
  });

//UPDATE
router.put('/:spotId', async(req, res) => {
    try {
        const { user } = req
        const {id} = req.params
        const {address, city, state, country, lat, lng, name, description, price} = req.body
        let updateSpot = await Spot.findOne({where: id})
        
        if(updateSpot.ownerId === user){
        await updateSpot.update({address, city, state, country, lat, lng, name, description, price})
        res.json(updateSpot)}
        
    } catch (error) {
        //custom error handler scheduled
        return console.log(error)
    }
  });

//DELETE
router.delete('/:spotId', async(req, res) => {
    try {
        const {user} = req
        const {spotId} = req.params
        let deleteSpot = await Spot.findByPk(spotId)
        if(user.id === deleteSpot.ownerId){
        await deleteSpot.destroy()
        res.json(deleteSpot)
    }
    } catch (error) {
        //custom error handler scheduled
        return console.log(error)
    }
  });


module.exports = router
