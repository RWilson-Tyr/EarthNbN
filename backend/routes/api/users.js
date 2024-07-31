const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('First name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Last name is required'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({firstName, lastName, email, username, hashedPassword });
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    await setTokenCookie(res, safeUser);

    return res.status(201), res.json({
      user: safeUser
    });

  } catch (error) {
    error.status = 500
    next(error)
  }
});


router.get('/test', async (req, res) => {
  let testing = await Spot.findAll({
    includes: [{ model: "Users" }],
    where: {
      ownerId: 2
    }
  })
  res.json(testing)
});


module.exports = router;
