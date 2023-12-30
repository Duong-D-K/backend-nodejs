"use strict";
//sửa trong file user xong phải sửa ở đây để tự động map vào db
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("bookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            statusId: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            patientId: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.STRING,
            },
            timeType: {
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
        await queryInterface.dropTable("bookings");
    },
};
