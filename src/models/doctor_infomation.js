"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Doctor_Information extends Model {
        static associate(models) {
        }
    }

    Doctor_Information.init(
        {
            doctorId: DataTypes.INTEGER,
            priceId: DataTypes.STRING,
            provinceId: DataTypes.STRING,
            paymentId: DataTypes.STRING,

            clinicName: DataTypes.STRING,
            clinicAddress: DataTypes.STRING,
            note: DataTypes.STRING,
            count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Doctor_Information",
            freezeTableName: true,//thông thường table trong php mysql phải thêm s ở cuối, nếu thêm thuộc tính này có thể đặt tên tùy ý
        }
    );
    return Doctor_Information;
};
