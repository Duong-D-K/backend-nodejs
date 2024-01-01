module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('specialties', 'nameEn', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        // await queryInterface.addColumn('doctor_informations', 'clinicId', {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('specialties', 'nameEn');
        // await queryInterface.removeColumn('doctor_informations', 'clinicId');
    },
};
