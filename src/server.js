import bodyParser from "body-parser"
import express from "express"
import data from "./data.json"

const app = express()

app.use(bodyParser.json())


var quotes = data["quotes"]; 

function findUser(userId){
    let user = {};
    for(let i = 0; i < quotes.length; i++){
        if(quotes[i].id == userId){
            user = quotes[i];
            break;
        }
    }

    return user;
}

app.get("/users", (req, res)=>{
    let userList = [];
    for(let i=0; i < quotes.length; i++){
        userList.push(quotes[i].username);
    }
    res.send(userList)
})

app.get("/users/:id", (req, res)=>{
    let userId = req.params.id;
    let user = findUser(userId);
    res.send(user);
})

app.get("/users/follows/:id", (req, res)=>{
    let userId =req.params.id;
    let user = findUser(userId);

    res.send(user.follows);
})

app.post("/users",  (req, res)=>{

    let userId = req.body.id;
    let username = req.body.username;
    let quote = req.body.quote;
    let follows = req.body.follows;
    
    let quoteObj = {"id": userId, "username": username, "quote": quote, "follows": follows};

    quotes.push(quoteObj);

    res.send(quoteObj);


})



app.listen(3000, ()=>{
    console.log("Port 3000 is listening...")
})






