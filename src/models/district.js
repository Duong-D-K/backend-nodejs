"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class District extends Model {
        static associate(models) {

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
