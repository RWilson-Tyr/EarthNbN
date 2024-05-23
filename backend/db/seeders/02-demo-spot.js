'use strict';

const { Spot } = require('../models');

let options = {};
options.tableName = "Spots";
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(options, [
      {
        ownerId: 2,
        address: "1 main",
        city: "test city",
        state: "test state",
        country: "test country",
        lat: 30.08,
        lng: -95.21,
        name: "test name",
        description: "test description",
        price: 99.99
      },
      {
        ownerId: 2,
        address: "12 main",
        city: "test city2",
        state: "test state2",
        country: "test country2",
        lat: 30.09,
        lng: -95.22,
        name: "test name2",
        description: "test description2",
        price: 100.00
      },
      {
        ownerId: 3,
        address: "123 main",
        city: "test city3",
        state: "test state3",
        country: "test country3",
        lat: 30.07,
        lng: -95.20,
        name: "test name3",
        description: "test description3",
        price: 50.99
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
