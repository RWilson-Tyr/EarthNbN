const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.post('/test', (req, res) => {
  try {
    res.json({ requestBody: req.body });    
  } catch (e) {
    console.log(e)
    res.json({
      message: "test route failed",
    })
  }
});

module.exports = router;
