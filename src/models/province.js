"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Province extends Model {
        static associate(models) {
            Province.hasMany(models.Clinic, { foreignKey: "provinceId", as: "province" });
        }
    }
    Province.init(
        {
            nameVi: DataTypes.STRING,
            nameEn: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Province",
        }
    );
    return Province;
};
