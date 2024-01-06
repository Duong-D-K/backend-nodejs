"use strict";
//sửa trong file user xong phải sửa ở đây để tự động map vào db
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("clinics", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            provinceId: {
                type: Sequelize.INTEGER,
            },
            districtId: {
                type: Sequelize.INTEGER,
            },

            descriptionHTML: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            descriptionMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },

            image: {
                type: Sequelize.BLOB("long"),
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
        await queryInterface.dropTable("clinics");
    },
};
