"use strict";
//sửa trong file user xong phải sửa ở đây để tự động map vào db
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("doctor_informations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING,
            },


            clinicName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            clinicAddress: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            note: {
                type: Sequelize.STRING,
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
        await queryInterface.dropTable("doctor_informations");
    },
};
