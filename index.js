// USER STORY
// AS A small business owner
// I WANT to be able to write and save notes
// SO THAT I can organize my thoughts and keep track of tasks I need to complete

// ACCEPTANCE CRITERIA
// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.static("public"))

// Home Page
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

// Returns the notes page
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/notes.html"));
})

// Retrieving the JSON notes
app.get("/api/notes",(req,res)=>{
    fs.readFile(path.join(__dirname,"/db/db.json"),"utf-8",(err,data)=>{
        if (err) {
            return res.status(500).json("error retrieving notes database")
        } else {
            const notes = JSON.parse(data);
            res.send(notes);
        }
    })
})

// Adding a new note
app.post("/api/notes",(req,res)=>{
    console.log(req);
    console.log(req.body);
    res.send("ok");
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
