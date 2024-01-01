module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('specialties', 'name', 'nameVi');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('specialties', 'nameVi', 'name');
    },
};
