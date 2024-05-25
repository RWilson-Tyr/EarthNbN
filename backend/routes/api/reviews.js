const express = require('express');
const { Review } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ - reviews by current user
router.get('/current', async(req, res, next)=>{
    try {
        res.json({message: "reviews current"})
    } catch (err) {
        
    }
})

//UPDATE
router.put('/:reviewId', async(req, res, next)=>{
    try {
        res.json({message: "review update"})
    } catch (err) {
        
    }
})

//DELETE
router.delete('/:reviewId', async(req, res, next)=>{
    try {
        res.json({message: "delete review"})
    } catch (err) {
        
    }
})

module.exports = router
