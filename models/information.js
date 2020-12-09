const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Information extends Model {
    static associate(models) {
      this.hasMany(models.Enroll);
    }
  }

  Information.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    date: { type: DataTypes.DATE, default: Date.now },
    no_of_Courses: { type: DataTypes.INTEGER, default: 0 },

  }, {
    sequelize,
    modelName: 'Information',
  });
  return Information;
};
