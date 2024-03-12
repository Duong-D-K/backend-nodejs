"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        static associate(models) {
            Clinic.belongsTo(models.District, { foreignKey: "districtId", as: "district" });
            Clinic.belongsTo(models.Province, { foreignKey: "provinceId", as: "province" });

            Clinic.hasOne(models.User, { foreignKey: "id" });
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
