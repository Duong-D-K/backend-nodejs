"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        static associate(models) {
            Specialty.hasOne(models.Doctor_Information, { foreignKey: "id" })
        }
    }
    Specialty.init(
        {
            nameVi: DataTypes.STRING,
            nameEn: DataTypes.STRING,
            image: DataTypes.STRING,
            contentHTML: DataTypes.TEXT("long"),
            contentMarkdown: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "Specialty",
        }
    );
    return Specialty;
};
