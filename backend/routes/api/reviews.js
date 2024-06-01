const express = require('express');
const { Review, User, ReviewImage, Spot} = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");


const router = express.Router();

//READ **INCOMPLETE** - reviews by current user
//need preview image in spots
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        let findReviews = await Review.findAll({
            include: [{model: User, attributes: {exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}}, 
            {model: Spot, attributes: {exclude: ['description', 'createdAt', 'updatedAt']}}, 
            {model: ReviewImage, attributes: {exclude: ['reviewId', 'createdAt', 'updatedAt']}}
            ],
            where: { userId: req.user.id }
        })
        res.json({ Reviews: findReviews })
    } catch (err) {
        next(err)
    }
})

//CREATE **COMPLETE** - Add image to a review based on Review ID
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    try {
        const {url} = req.body
        let reviewId = parseInt(req.params.reviewId)
        const findReview = await Review.findOne({where: reviewId})
        if(!reviewId){throw new Error("Review couldn't be found")}
        if(req.user.id !== findReview.userId) {throw new Error('Forbidden')}
        let createImage = await ReviewImage.create({url, reviewId})
        let returnNewImage = await ReviewImage.findAll({where: {id: createImage.id}, attributes: {exclude: ['reviewId', 'createdAt', 'updatedAt']}})
        res.json(...returnNewImage)
    } catch (err) {
        next(err)
    }
})

//UPDATE **COMPLETE**
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    try {
        let { review, stars } = req.body
        const reviewId = parseInt(req.params.reviewId)
        const findReview = await Review.findByPk(reviewId)
        if(!findReview){throw new Error("Review couldn't be found")}
        if(findReview.userId !== req.user.id){throw new Error('Forbidden')}
        const updateReview = await findReview.update({ review, stars })
        res.json(updateReview)
    } catch (err) {
        next(err)
    }
})

//DELETE **INCOMPLETE**
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    try {
        const reviewId = parseInt(req.params.reviewId)
        let findReview = await Review.findByPk(reviewId)
        if(!findReview){throw new Error("Review couldn't be found")}
        if(findReview.userId !== req.user.id){throw new Error('Forbidden')}
        await Review.destroy({where: {id: reviewId}})
        res.json({ message: "Successfully deleted" })
    } catch (err) {
        next(err)
    }
})

module.exports = router
