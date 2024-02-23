import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Businesses from "./BusinessModel.js";

const { DataTypes } = Sequelize;

const BusinessLocations = db.define(
  "businessLocations",
  {
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    display_address: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

BusinessLocations.belongsTo(Businesses, { foreignKey: "businessId" });
Businesses.hasMany(BusinessLocations);

export default BusinessLocations;
