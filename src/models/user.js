"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Allcode, { foreignKey: "gender", targetKey: "keyMap", as: "genderData" });
            User.belongsTo(models.Allcode, { foreignKey: "positionId", targetKey: "keyMap", as: "positionData" });
            User.belongsTo(models.Allcode, { foreignKey: "roleId", targetKey: "keyMap", as: "roleData" });

            User.belongsTo(models.Specialty, { foreignKey: "specialtyId" })

            User.belongsTo(models.Clinic, { foreignKey: "clinicId" })

            User.hasOne(models.Markdown, { foreignKey: "doctorId" });

            User.hasOne(models.Doctor_Information, { foreignKey: "doctorId" });
        }
    };
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            address: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            gender: DataTypes.STRING,
            image: DataTypes.STRING,
            roleId: DataTypes.STRING,
            positionId: DataTypes.STRING,
            specialtyId: DataTypes.STRING,
            clinicId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
