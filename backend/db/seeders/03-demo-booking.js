'use strict';

const { Booking } = require('../models');

let options = {};
options.tableName = "Bookings";
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: Date.now() + 86400000,
        endDate: Date.now() + 172800000,
      },
      {
        spotId: 2,
        userId: 3,
        startDate: Date.now() + 86400000,
        endDate: Date.now() + 172800000,
      },
      {
        spotId: 3,
        userId: 1,
        startDate: Date.now() + 86400000,
        endDate: Date.now() + 172800000,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
