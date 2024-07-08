async function customGetMessage(obj) {
    try {
        const response = await fetch('http://localhost:8003/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseMessage = await response.json();

        if (!responseMessage) {
            throw new Error('Empty response from server');
        }

        console.log(responseMessage); // Log the response message for debugging

        return responseMessage; // Return the parsed data from the response
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return { message: 'Network error' }; // Return a fallback object in case of error
    }
}

export default customGetMessage;
