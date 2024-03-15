module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'introduction', {
            type: Sequelize.TEXT("long"),
            allowNull: false,
        });
        await queryInterface.addColumn('users', 'note', {
            type: Sequelize.TEXT("long"),
            allowNull: false,
        });
        await queryInterface.addColumn('users', 'contentHTML', {
            type: Sequelize.TEXT("long"),
            allowNull: false,
        });
        await queryInterface.addColumn('users', 'contentMarkdown', {
            type: Sequelize.TEXT("long"),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'introduction');
        await queryInterface.removeColumn('users', 'note');
        await queryInterface.removeColumn('users', 'contentHTML');
        await queryInterface.removeColumn('users', 'contentMarkdown');
    },
};
