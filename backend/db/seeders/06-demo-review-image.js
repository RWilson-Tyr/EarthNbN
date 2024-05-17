'use strict';

const { ReviewImage } = require('../models');

let options = {};
options.tableName = 'ReviewImages';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(options,[
      {
        reviewId: 1,
        url: "testReviewImage1"
      },
      {
        reviewId: 2,
        url: "testReviewImage2"
      },
      {
        reviewId: 3,
        url: "testReviewImage3"
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
