const Conversation = require('../models/chatModel');
const sequelize = require('./dbconfig');

// Get all conversations
const getAllConversations = async () => {
    try {
        await sequelize.authenticate();
        const conversations = await Conversation.findAll();
        return conversations;
    } catch (error) {
        throw error;
    }
}

// Get conversation by sessionId
const getConversationBySessionId = async (sessionId) => {
    try {
        await sequelize.authenticate();
        const conversation = await Conversation.findAll({ 
            where: { sessionId: sessionId },
            order: [['date', 'DESC']]
        });
        return conversation;
    } catch (error) {
        throw error;
    }
}

// getConversationBySessionId("2973b967-8df1-496e-b1bf-f8735283b2cc")
//     .then((conversations) => console.log(conversations[0].dataValues))

module.exports = { getAllConversations, getConversationBySessionId };