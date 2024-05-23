const express = require('express');
const { Booking } = require('../../db/models');
const {requireAuth} = require("../../utils/auth.js");
const { CustomErrHandler } = require('../../errors/error');

const router = express.Router();

module.exports = router