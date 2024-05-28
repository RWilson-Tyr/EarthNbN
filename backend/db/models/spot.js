'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: "ownerId", onDelete: 'CASCADE', hooks: true })
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId", onDelete: 'CASCADE', hooks: true })
      Spot.hasMany(models.Booking, {foreignKey: "spotId", onDelete: 'CASCADE', hooks: true})
      Spot.hasMany(models.Review, { foreignKey: "spotId", onDelete: 'CASCADE', hooks: true })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {

      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    lat: {
      type: DataTypes.FLOAT,
      validate: {
        min: -90,
        max: 90
      }

    },
    lng: {
      type: DataTypes.FLOAT,
      validate: {
        min: -180,
        max: 180
      }

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
