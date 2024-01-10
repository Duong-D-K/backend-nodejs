"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        static associate(models) {
            Patient.hasMany(models.Booking, { foreignKey: "patientId" });

            Patient.belongsTo(models.Allcode, { foreignKey: "gender", targetKey: "keyMap" });
        }
    }
    Patient.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.STRING,
            address: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            gender: DataTypes.STRING,
            image: DataTypes.STRING,
            birthday: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Patient",
        }
    );
    return Patient;
};
