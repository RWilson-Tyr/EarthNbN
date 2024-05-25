const express = require('express');
const { Booking } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ - all current user bookings
router.get('/', async(req, res, next)=>{
    try {
        res.json({message: "current user bookings"})
    } catch (err) {
        
    }
})

//UPDATE - booking based on booking Id
router.put('/:bookingId', async(req, res, next)=>{
    try {
        res.json({message: "update booking"})
    } catch (err) {
        
    }
})

//DELETE - booking by booking ID
router.delete('/:bookingId', async(req, res, next)=>{
    try {
        res.json({message: "update booking"})
    } catch (err) {
        
    }
})

module.exports = router
