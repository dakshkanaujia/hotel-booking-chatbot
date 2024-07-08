async function getAllRooms() {
    try {
        const response = await fetch('https://bot9assignement.deno.dev/rooms');
        const data = await response.json();
        return JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching hotel rooms:', error);
        return 'failed to fetch';
    }
}
module.exports = getAllRooms;