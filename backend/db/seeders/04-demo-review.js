'use strict';

const { Review } = require('../models');

let options = {};
options.tableName = 'Reviews';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "test review 1 -spot1 -user2",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: "test review 2 -spot2 -user3",
        stars: 3
      },
      {
        spotId: 3,
        userId: 1,
        review: "test review 3 -spot3 -user1",
        stars: 5
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
