"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //định danh các mối quan hệ như 1-1, 1-n, n-1
            // define association here
        }
    }
    Specialty.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Specialty",
        }
    );
    return Specialty;
};
