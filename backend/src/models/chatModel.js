const {DataTypes} = require('sequelize');
const sequelize = require('../database/dbconfig');

const Conversation = sequelize.define('Chat', {
    sessionId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
});



module.exports = Conversation;
