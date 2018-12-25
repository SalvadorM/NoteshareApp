const Sequelize = require('sequelize')
/*
NOT FINAL TABLE FOR comment

*/ 
module.exports = (sequelize, DataTypes) => {
    const Comment= sequelize.define('comment', {
        
       body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        
    },
    });

    Comment.associate = (models) => {
        models.Comment.belongsTo(models.Note
        ),
        models.Comment.belongsTo(models.User
            );
      }
    return Comment;
};