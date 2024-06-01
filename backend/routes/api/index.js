const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImageRouter = require('./spot-images.js');
const reviewImageRouter = require('./review-images.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

//temp home page
router.get('/', (req, res, next) => {
  res.json({ message: "Welcome to API Home" })
})

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImageRouter);

router.use('/review-images', reviewImageRouter);

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
