const express = require('express');
const { Review, User, ReviewImages } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ - reviews by current user
router.get('/current', requireAuth, async(req, res, next)=>{
    try {
        // res.json({message: "hello"})
        console.log("---------------->",req.user.id)
        let findReviews = await Review.findAll({
            include: [User
                // , ReviewImages
            ],
            where: {userId: req.user.id}
            })
        res.json({Reviews: findReviews})
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
