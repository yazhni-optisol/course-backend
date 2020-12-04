const { Model } = require('sequelize');
const { Course } = require('./course');

module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    static associate(models) {
      this.belongsTo(models.Course);
    }
  }

  Lecture.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userID cannot be empty',
        },
      },

    },
    name: { type: DataTypes.STRING, allowNull: false },
    linkID: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    resources: { type: DataTypes.STRING },
    sno: { type: DataTypes.INTEGER, default: 0 },
    date: { type: DataTypes.DATE, default: Date.now },

  }, {
    sequelize,
    modelName: 'Lecture',
  });
  console.log(Lecture === sequelize.models.Lecture); // true

  return Lecture;
};

// User.Information = User.belongsTo(Information);
