const getResponse = require('../services/openaiService');
const createConversation = require('../database/createConversation');
const getConversationHistory = require('../database/getConversations');

const chat = async (req, res) => {
    try {
        const SID = req.body.sessionId;
        const msg = req.body.Content;
        const message = JSON.stringify(msg);
        
        console.log("2");
        console.log("req.body  :  " + typeof message);
        const resp = await getResponse(message);
        const responseAI = resp;
        
        // save the user conversation
        await createConversation({ SID, role: "user", message });
        console.log('User Conversation saved');
        
        console.log("3");
        // save the AI response in the database
        await createConversation({ SID, role: "assistant", responseAI });
        console.log('AI Conversation saved');
        
        console.log("4");
        res.json({ response: responseAI });
    } catch (err) {
        console.error('Error in chat:', err);
        res.status(500).json({ response: "Network Issue, try again later" });
    }
}

module.exports = chat;
