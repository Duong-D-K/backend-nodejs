"use strict";
//sửa trong file user xong phải sửa ở đây để tự động map vào db
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("schedules", {
            // currentNumber: DataTypes.INTEGER,
            // maxNumber: DataTypes.INTEGER,
            // date: DataTypes.DATE,
            // timeType: DataTypes.STRING,
            // doctorId: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            currentNumber: {
                type: Sequelize.INTEGER,
            },
            maxNumber: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.STRING,
            },
            timeType: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("schedules");
    },
};
