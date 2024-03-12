module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'specialtyId', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn('users', 'clinicId', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'specialtyId');
        await queryInterface.removeColumn('users', 'clinicId');
    },
};
