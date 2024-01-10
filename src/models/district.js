"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class District extends Model {
        static associate(models) {
            District.hasMany(models.Clinic, { foreignKey: "districtId", as: "district" });
        }
    }

    District.init(
        {
            nameVi: DataTypes.STRING,
            nameEn: DataTypes.STRING,
            provinceId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "District",
        }
    );
    return District;
};
