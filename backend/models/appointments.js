const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, { as: 'poster', foreignKey: 'posterId' });
      Appointment.belongsTo(models.User, { as: 'claimer', foreignKey: 'claimerId' });
    }
  }
  Appointment.init(
    {
      propertyAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      compensation: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('available', 'claimed', 'completed'),
        defaultValue: 'available',
      },
    },
    {
      sequelize,
      modelName: 'Appointment',
    }
  );
  return Appointment;
};
