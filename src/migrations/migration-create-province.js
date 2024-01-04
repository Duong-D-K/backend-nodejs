"use strict";
//sửa trong file user xong phải sửa ở đây để tự động map vào db
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("provinces", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nameVi: {
                type: Sequelize.STRING,
            },
            nameEn: {
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
        await queryInterface.dropTable("provinces");
    },
};
