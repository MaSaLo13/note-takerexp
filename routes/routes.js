const express = require('express').Router();
const { v4: uuid } = require('uuid');
const fs = require('fs');
const { stringify } = require('querystring');


// will read what is in db json, should show up in /notes
express.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotesObjs = JSON.parse(data);
            res.json(parsedNotesObjs);
            console.log(parsedNotesObjs)
        }
    }
    )
});

// for posting into db.json 
express.post('/notes', (req, res) => {
    const { title, text } = req.body
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4), (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        res.json(data);
                        console.log('Successfully written to file');
                    }
                })
            }
        })
    }
});

express.delete('/notes/:id', (req,res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNote = JSON.parse(data);
            const filteredArray = parsedNote.filter(note => req.params.id !== note.id)
            fs.writeFile('db/db.json', JSON.stringify(filteredArray, null, 4), (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json(data);
                    console.log('Successfully deleted from file');
                }
            })
        }
    })
});


module.exports = express;