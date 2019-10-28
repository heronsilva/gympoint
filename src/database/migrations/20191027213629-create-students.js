module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'students',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        birthday: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        weight: Sequelize.DECIMAL(10, 2),
        height: Sequelize.DECIMAL(10, 2),
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    )
  },

  down: queryInterface => {
    return queryInterface.dropTable('students')
  },
}
