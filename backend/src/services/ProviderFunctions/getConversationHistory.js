const {getConversationBySessionId} = require('../../database/getConversations')

async function getConversationHistory(sessionId){
    const conversations = await getConversationBySessionId(sessionId);
    let arr = Array.isArray(conversations) ? conversations : [];

    arr = arr.map((conv) => {
        {
            return {
                role : conv.dataValues.role,
                content : (conv.dataValues.message) ? conv.dataValues.message : ""
            }
        }
    })

    return arr;
}

modules.export = getConversationHistory;