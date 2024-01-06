"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        static associate(models) {
            // define association here
        }
    }
    Clinic.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            provinceId: DataTypes.INTEGER,
            districtId: DataTypes.INTEGER,

            descriptionHTML: DataTypes.TEXT("long"),
            descriptionMarkdown: DataTypes.TEXT("long"),

            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Clinic",
        }
    );
    return Clinic;
};
