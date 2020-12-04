const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Course);
      this.hasMany(models.Answer);
    }
  }

  Question.init({
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

    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userID cannot be empty',
        },
      },

    },
    text: { type: DataTypes.STRING, allowNull: false },
    sno: { type: DataTypes.INTEGER, default: 0 },
    date: { type: DataTypes.DATE, default: Date.now },
    nAnswers: { type: DataTypes.INTEGER, default: 0 },

  }, {
    sequelize,
    modelName: 'Question',
  });
  console.log(Question === sequelize.models.Question); // true

  //   Question.associate = (models) => {
  //     Question.belongsTo(models.Answer, {
  //         foreignKey: "qid",
  //         localfield:"_id"
  //     })

  // }

  return Question;
};

// User.Information = User.belongsTo(Information);
