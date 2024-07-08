const Conversation = require('../models/chatModel');
const sequelize = require('./dbconfig');

// Create a new conversation
const createConversation = async (data) => {
  try {
    await sequelize.authenticate();
    const conversation = await Conversation.create(data);
    return conversation;
  } catch (error) {
    throw error;
  }
};

module.exports = createConversation;