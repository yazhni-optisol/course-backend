const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }

  Answer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userID cannot be empty',
        },
      },

    },
    qid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userID cannot be empty',
        },
      },
      references: {
        model: 'Questions',
        key: 'id',
      },
    },
    text: { type: DataTypes.STRING, allowNull: false },
    sno: { type: DataTypes.INTEGER, default: 0 },
    date: { type: DataTypes.DATE, default: Date.now },

  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};

// User.Information = User.belongsTo(Information);
