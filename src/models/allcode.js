"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: "positionId", as: "positionData" });
            Allcode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
            Allcode.hasMany(models.User, { foreignKey: "roleId", as: "roleData" });

            Allcode.hasMany(models.Schedule, { foreignKey: "timeType", as: "timeTypeData" });

            Allcode.hasMany(models.Doctor_Information, { foreignKey: "priceId", as: "priceData" });
            Allcode.hasMany(models.Doctor_Information, { foreignKey: "paymentId", as: "paymentData" });
            Allcode.hasMany(models.Doctor_Information, { foreignKey: "provinceId", as: "provinceData" });

            Allcode.hasMany(models.Patient, { foreignKey: "gender" });

            Allcode.hasMany(models.Booking, { foreignKey: "appointmentTime" });
        }
    }

    Allcode.init(
        {
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Allcode",
        }
    );
    return Allcode;
};
