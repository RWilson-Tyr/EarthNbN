const express = require('express');
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require("../../utils/auth.js");

const router = express.Router();

//DELETE **COMPLETED**
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    try {
        const imageId = parseInt(req.params.imageId)
        const reqUser = parseInt(req.user.id)
        const findImage = await SpotImage.findAll({where: {id: imageId}})
        console.log(findImage)
        if(!findImage[0]){res.json({message: "Spot Image couldn't be found"})}
        const findOwner = await Spot.findAll({where: { id: findImage[0].spotId}})
        if(reqUser === findOwner[0].id){
            await SpotImage.destroy({where: {id: imageId}})
            res.json({message: "successfully deleted"})
        } else {throw new Error('Forbidden')}
        
    } catch (err) {
        next(err)
    }
})



module.exports = router
