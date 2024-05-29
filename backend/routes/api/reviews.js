const express = require('express');
const { Review, User, ReviewImage, Spot } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');
const reviewimage = require('../../db/models/reviewimage.js');

const router = express.Router();

//READ **INCOMPLETE** - reviews by current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        let findReviews = await Review.findAll({
            include: [{model: User}, {model: Spot}, {model: ReviewImage}
            ],
            where: { userId: req.user.id }
        })
        res.json({ Reviews: findReviews })
    } catch (err) {
        next(err)
    }
})

//CREATE **INCOMPLETE** - Add image to a review based on Review ID
router.post('/:reviewId/images', async (req, res, next) => {
    try {
        const {url} = req.body
        let reviewId = parseInt(req.params.reviewId)
        const findReview = await Review.findOne({where: reviewId})
        if(!reviewId){throw new Error("unable to locate review!")}
        if(req.user.id !== findReview.userId) {throw new Error("this is not your post!")}
        let createImage = await ReviewImage.create({url, reviewId})
        let returnNewImage = await ReviewImage.findByPk(createImage.id)
        res.json(returnNewImage)
    } catch (err) {
        next(err)
    }
})

//UPDATE **INCOMPLETE**
router.put('/:reviewId', async (req, res, next) => {
    try {
        let { review, stars } = req.body
        const reviewId = parseInt(req.params.reviewId)
        const findReview = await Review.findByPk(reviewId)
        if(!findReview){throw new Error("That post does not exist!")}
        if(findReview.userId !== req.user.id){throw new Error("This is not your post!")}
        const updateReview = await findReview.update({ review, stars })
        res.json(updateReview)
    } catch (err) {
        next(err)
    }
})

//DELETE **INCOMPLETE**
router.delete('/:reviewId', async (req, res, next) => {
    try {
        const reviewId = parseInt(req.params.reviewId)
        let findReview = await Review.findByPk(reviewId)
        if(!findReview){throw new Error("That post does not exist!")}
        if(findReview.userId !== req.user.id){throw new Error("This is not your post!")}
        await Review.destroy({where: {id: reviewId}})
        res.json({ message: "Successfully deleted" })
    } catch (err) {
        next(err)
    }
})

module.exports = router
