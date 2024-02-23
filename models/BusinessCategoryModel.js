import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Businesses from "./BusinessModel.js";

const { DataTypes } = Sequelize;

const BusinessCategories = db.define(
  "businessCategories",
  {
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
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

Businesses.hasMany(BusinessCategories);
BusinessCategories.belongsTo(Businesses, { foreignKey: "businessId" });

export default BusinessCategories;
