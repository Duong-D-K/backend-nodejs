"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Province extends Model {

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
