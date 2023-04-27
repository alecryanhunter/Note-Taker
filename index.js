const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
            res.json(notes);
        }
    })
})

// Adding a new note
app.post("/api/notes",(req,res)=>{
    fs.readFile(path.join(__dirname,"/db/db.json"),"utf-8",(err,data)=>{
        if (err) {
            res.status(500).json("error reading database");
        } else {
            const notesArray = JSON.parse(data);
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: (Math.floor(Math.random()*10000))
            }
            notesArray.push(newNote);
            fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(notesArray,null,4),(err)=>{
                if (err) {
                    res.status(500).json("error writing database");
                } else {
                    res.json({
                        msg: "Note logged successfully",
                        note: newNote
                    })
                }
            })
        }
    })
})

// Deleting a note
app.delete("/api/notes/:id",(req,res)=>{
    fs.readFile(path.join(__dirname,"/db/db.json"),"utf-8",(err,data)=>{
        if (err) {
            res.status(500).json("error reading notes database");
        } else {
            const notesArray = JSON.parse(data);
            // Finds and splices out the desired note from the array
            const delId = Number(req.params.id);
            const delFind = (element)=>{
                return element.id===delId;
            }
            const delIndex = notesArray.findIndex(delFind);
            const deletedNote = notesArray.splice(delIndex,1)
            fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(notesArray,null,4),(err,data)=>{
                if (err) {
                    res.status(500).json("error writing notes database");
                } else {
                    res.json({
                        msg: "deleted note",
                        deletedNote: deletedNote
                    });
                }
            })
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})