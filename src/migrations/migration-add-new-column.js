module.exports = {
    up: async (queryInterface, Sequelize) => {
        // await queryInterface.addColumn('users', 'introduction', {
        //     type: Sequelize.TEXT("long"),
        //     allowNull: false,
        // });

        await queryInterface.renameColumn('users', 'address', 'provinceId');

    },

    down: async (queryInterface, Sequelize) => {
        // await queryInterface.removeColumn('users', 'introduction');

        await queryInterface.renameColumn('tableName', 'provinceId', 'address');
    },
};
