const express = require('express');
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");

const router = express.Router();

//DELETE **COMPLETED**
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    try {
        const imageId = parseInt(req.params.imageId)
        const reqUser = parseInt(req.user.id)
        const findImage = await ReviewImage.findAll({where: {id: imageId}})
        console.log(findImage)
        if(!findImage[0]){res.json({message: "Review Image couldn't be found"})}
        const findOwner = await Review.findAll({where: {id: findImage[0].reviewId}})
        if(reqUser === findOwner[0].id){
            await ReviewImage.destroy({where: {id: imageId}})
            res.json({message: "successfully deleted"})
        } else {throw new Error('Forbidden')}
        
    } catch (err) {
        next(err)
    }
})



module.exports = router
