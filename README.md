# Hotel Room Booking Agent ChatBot using OPEN AI API


## Installation
Instructions on how to install and set up the project.

```sh
# Command to run backend
git clone https://github.com/dakshkanaujia/dukaan-assignment.git
cd backend
npm install
npm install -d nodemon cors express openai sqlite sequelize dotenv
npz nodemon src/app.js
```

## Using postman we can make POST request, 
first we have to create a .env file, and give API_KEY declaration
then also define a PORT
example 
```sh
PORT = 8003
API_KEY = "sk-pro-**"
```
## Endpoints Example

```sh
#endpoint
http://localhost:8003/chat

#req body example
{
    "sessionId" : 1,
    "Role" : "user",
    "Content" : "Hello, how are you"
}
``` 


## Working model video via postman
<a href="https://www.youtube.com/channel/UCW8DCByIFHu9UMOU5T9Q6Lg" target="_blank">Watch the Video here!...</a>
