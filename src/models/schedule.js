"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        static associate(models) {
            // define association here
            Schedule.belongsTo(models.Allcode, { foreignKey: "timeType", targetKey: "keyMap", as: "timeTypeData" });
            //Khi front-end muốn lấy trường 'timeType', sẽ map tới trường 'keyMap' trong bảng 'AllCode'
            //và khi trả lại data bên bảng Allcode dưới tên là 'timeTypeData'
        }
    }
    Schedule.init(
        {
            currentNumber: DataTypes.INTEGER,
            maxNumber: DataTypes.INTEGER,
            date: DataTypes.STRING,
            timeType: DataTypes.STRING,
            doctorId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Schedule",
        }
    );
    return Schedule;
};
