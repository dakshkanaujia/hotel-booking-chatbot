require('dotenv').config();
const API_KEY = process.env.API_KEY;
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: API_KEY });
const getTools = require('./ProviderFunctions/getTools');
const postRoom_Booking = require('./ProviderFunctions/postRoomBooking');
const getAll_Rooms = require('./ProviderFunctions/getAllRooms');

let messages = [
    {
        role: 'system',
        content: `You are a hotel booking agent, named Lion, and you are not allowed to answer any question apart from hotel booking.
            Chat structure:
            - Greet and understand 
            - guide the user on what their next step could be.
            - The user will ask for the list of rooms.
            - First you will show the name of the rooms
            - Then user will ask about a specific room , then tell its price and description
            - You will show the list of rooms.
            - The user will select one hotel.
            - You will ask the number of guests.
            - Number of days of stay.
            - Calculate the price and ask for confirmation.
            - If the user accept the booking, then create a json object which has (roomId, fullName, email, nights) as arguments all required, and send it in response
            - If no, reject the booking.`,
    },
];

const getAllRooms = async() => {
    try{
        const response = await getAll_Rooms();
        console.log("get_All_rooms chal raha hai")
        return response;
    }catch (error){
        console.log("getAllRooms nai chal ra");
        return (error);
    }
} 
// const postRoomBooking = async(roomId, fullName, email, nights) => {
//     try{
//         const response = await postRoom_Booking(roomId, fullName, email, nights);
//         return JSON.stringify(response);
//     } catch (error){
//         return error;
//     }
// }
async function postRoomBooking(roomId, fullName, email, nights) {
    const payload = {
        roomId: roomId,
        fullName: fullName,
        email: email,
        nights: nights
    };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
    
    console.log("Request payload:", payload);
    
    try {
        const response = await fetch('https://bot9assignement.deno.dev/book', options);
        
        console.log("Response received");

        console.log(`Response Status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Response data:", data);
        return JSON.stringify(data);
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

const getResponseFromGPT = async (message) => {
    const obj = {
        role: "user",
        content: message,
    };
    messages = [...messages, obj];

    try {
        const tools = getTools();
        const options = {
            model: 'gpt-3.5-turbo',
            messages: messages,
            tools : tools,
            tool_choice: 'auto',
        };

        const response = await openai.chat.completions.create(options);
        const responseMessage = response.choices[0].message;
        messages.push(responseMessage);

        if (responseMessage.tool_calls) {
            const toolCalls = responseMessage.tool_calls;
            const availableFunctions = {
                get_All_Rooms: getAllRooms,
                post_room_booking : postRoomBooking
            };


            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionToCall = availableFunctions[functionName];
                const functionArgs = JSON.parse(toolCall.function.arguments);
                let functionResponse = null;
                if(functionArgs){
                    functionResponse = await functionToCall(
                        functionArgs.roomId,
                        functionArgs.fullName,
                        functionArgs.email,
                        functionArgs.nights
                    );
                }else{
                    functionResponse = await functionToCall();
                }

                console.log(functionToCall);
                console.log(toolCall.function.arguments)

                messages.push({
                    tool_call_id: toolCall.id,                    
                    role: 'tool',
                    content: JSON.stringify(functionResponse),
                });
            }

            const secondResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });

            return (secondResponse.choices[0].message);
        } else {
            return (responseMessage);
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const getResponse = async(message) => {
    try {
        const response = await getResponseFromGPT(message);
        return response;
    } catch (error) {
        console.error(error);
    }
}


module.exports = getResponse;
