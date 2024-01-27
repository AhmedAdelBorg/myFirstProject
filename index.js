const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Artical");
const app = express();

mongoose.connect("mongodb+srv://Ahmed2:ahmed123@myfirstproject.ay66hka.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("conected sucssesfly")
}).catch((e) => {
    console.log("error", e);
})

// mongodb+srv://Ahmed2:ahmed123@myfirstproject.ay66hka.mongodb.net/?retryWrites=true&w=majority

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello ahmed")
})

app.get("/hi", (req, res) => {
    let number = "";
    for(let i = 0; i <= 100; i++) {
        number += i + "-";
    }
    res.send(number);
    // res.send("you vesited hi")
})
app.post("/addComment", (req, res) =>{
    res.send("you are now in post request in postman")
})
app.post("/hello", (req, res) =>{
    
    const name = req.body.name;
    const age = req.body.age
    res.send(`my name is ${name}, i'm ${age} years ald`);
})

app.post("/fined", (req, res) => {
    const name = req.body.name;
    const age = req.body.age
    res.send(`my name is ${name}, i'm ${age} years ald`);
})

app.post("/numbers/:num1/:num2", (req, res) =>{
    const num1 = req.params.num1;
    const num2 = req.params.num2;
    const total = Number(num1) + Number(num2)
    res.send(`the numbers are ${total} `)
})

app.get("/showHtml", (req, res) => {
    let number = "";
    for(let i = 0; i <= 100; i++) {
        number += i + "-";
    }
    // res.sendFile(__dirname + "/views/numbers.html")

    res.render("numbers.ejs", {
        name : "Ahmed",
        numbers: number
    });
})

app.post("/article", async(req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const newArtical = new Article();
    newArtical.title = title
    newArtical.body = body
    newArtical.numberOfLikes = 0
    await newArtical.save();
    res.send("the requier has been sucssesfully")
})

app.get("/article", async(req, res) => {
    const articles = await Article.find();
     res.render("artical.ejs", {
        allArticals: articles
     });
})
app.get("/article/:articalId", async(req, res) => {
    const artId = req.params.articalId;
    try {
        const article = await Article.findById(artId);
         res.json(article);
         return;
    } catch(error) {
        console.log(error);
    }
})

app.delete("/article/:articalId", async(req, res) => {
    const artId = req.params.articalId;
    try {
        const article = await Article.findByIdAndDelete(artId);
         res.json(article);
         return;
    } catch(error) {
        console.log(error);
    }
})



app.listen(3000, () => {
    console.log("you are connected")
})