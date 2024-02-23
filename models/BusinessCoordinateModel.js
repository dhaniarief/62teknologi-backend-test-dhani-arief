import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Businesses from "./BusinessModel.js";

const { DataTypes } = Sequelize;

const BusinessCoordinates = db.define(
  "businessCoordinates",
  {
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    longitude: {
      type: DataTypes.DOUBLE,
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

Businesses.hasMany(BusinessCoordinates);
BusinessCoordinates.belongsTo(Businesses, { foreignKey: "businessId" });

export default BusinessCoordinates;
