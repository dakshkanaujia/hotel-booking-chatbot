function getTools(){
    const tools = [
            {
                type: 'function',
                function: {
                    name: 'get_All_Rooms',
                    description: 'List of all Rooms available for booking',
                },
            },
            {
                type: "function",
                function: {
                    name: "post_room_booking",
                    description: "To post room details after successful booking",
                    parameters: {
                        type: "object",
                        properties: {
                            roomId: {
                                type: "number",
                                description: "ID of the room being booked"
                            },
                            fullName: {
                                type: "string",
                                description: "Full name of the person booking the room"
                            },
                            email: {
                                type: "string",
                                description: "Email address of the person booking the room"
                            },
                            nights: {
                                type: "number",
                                description: "Number of nights the room is booked for"
                            }
                        },
                        required: ["roomId", "fullName", "email", "nights"],
                    },
                }
            }        
    ]   
    return tools; 
}

module.exports = getTools;