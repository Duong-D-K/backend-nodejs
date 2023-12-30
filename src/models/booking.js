"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
        }
    }
    Booking.init(
        {
            statusId: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
            appointmentDate: DataTypes.STRING,
            appointmentTime: DataTypes.STRING,
            reason: DataTypes.STRING,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Booking",
        }
    );
    return Booking;
};
