'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
      },
      {
        spotId: 2,
        userId: 3,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
      },
      {
        spotId: 3,
        userId: 1,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
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
