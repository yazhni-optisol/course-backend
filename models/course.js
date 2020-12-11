const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Enroll);
      this.hasMany(models.Lecture);
      this.hasMany(models.Question);
      this.belongsTo(models.Instructor, { foreignKey: 'instructorID' });
    }
  }

  Course.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    instructorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userID cannot be empty',
        },
      },

    },
    price: {
      type: DataTypes.INTEGER,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
    },

    logo: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    suggestions: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      default: Date.now,
    },
    no_of_Students: { type: DataTypes.INTEGER, default: 0 },
    no_of_Lectures: { type: DataTypes.INTEGER, default: 0 },
    no_of_Questions: { type: DataTypes.INTEGER, default: 0 },

  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
