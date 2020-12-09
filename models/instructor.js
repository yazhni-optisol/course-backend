const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    static associate(models) {
      this.hasOne(models.Course);
    }
  }

  Instructor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userID cannot be empty',
        },
      },
    },

    bio: { type: DataTypes.STRING },
    twitter: { type: DataTypes.STRING },
    fb: { type: DataTypes.STRING },
    insta: { type: DataTypes.STRING },
    git: { type: DataTypes.STRING },
    others: { type: DataTypes.STRING },
    salary: { type: DataTypes.INTEGER, default: 0 },
    no_of_Courses: { type: DataTypes.INTEGER, default: 0 },
    date: { type: DataTypes.DATE, default: Date.now },

  }, {
    sequelize,
    modelName: 'Instructor',
  });
  return Instructor;
};
