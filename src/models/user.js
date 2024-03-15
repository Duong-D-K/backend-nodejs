"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Allcode, { foreignKey: "gender", targetKey: "keyMap", as: "genderData" });
            User.belongsTo(models.Allcode, { foreignKey: "positionId", targetKey: "keyMap", as: "positionData" });
            User.belongsTo(models.Allcode, { foreignKey: "roleId", targetKey: "keyMap", as: "roleData" });
            User.belongsTo(models.Allcode, { foreignKey: "priceId", targetKey: "keyMap", as: "priceData" });
            User.belongsTo(models.Allcode, { foreignKey: "paymentId", targetKey: "keyMap", as: "paymentData" });

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
            paymentId: DataTypes.STRING,
            priceId: DataTypes.STRING,
            introduction: DataTypes.TEXT("long"),
            note: DataTypes.TEXT("long"),
            contentHTML: DataTypes.TEXT("long"),
            contentMarkdown: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
