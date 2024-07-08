async function postRoomBooking(roomId, fullName, email, nights){
    const payload = {
        roomId: roomId,
        fullName: fullName,
        email: email,
        nights: nights
    };
    options = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(payload)
    }
    console.log(payload);
    try{
        const response = await fetch('https://bot9assignement.deno.dev/book', options)
        if(response){
            throw new Error('Nahi chalra : ***** :: ***************** : :: ', response)
        }
        console.log("Chal Gaya bhaiii");

        const data = await response.json();
        return JSON.stringify(data);
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = postRoomBooking;