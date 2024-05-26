const express = require('express');
const { Review, User, ReviewImages } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

//READ **INCOMPLETE** - reviews by current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        // res.json({message: "hello"})
        console.log("---------------->", req.user.id)
        let findReviews = await Review.findAll({
            include: [User
                // , ReviewImages
            ],
            where: { userId: req.user.id }
        })
        res.json({ Reviews: findReviews })
    } catch (err) {
        next(err)
    }
})

//UPDATE **INCOMPLETE**
router.put('/:reviewId', async (req, res, next) => {
    try {
        let { review, stars } = req.body
        const starParse = parseInt(stars)
        const findReview = await Review.findOne({ where: { id: req.params.reviewId } })
        const updateReview = await findReview.update({ review, starParse })
        res.json(updateReview)
    } catch (err) {
        next(err)
    }
})

//DELETE **INCOMPLETE**
router.delete('/:reviewId', async (req, res, next) => {
    try {
        let findReview = await Review.findOne({ where: { id: req.params.reviewId } })
        await findReview.destroy()
        res.json({ message: "delete review" })
    } catch (err) {
        next(err)
    }
})

module.exports = router
