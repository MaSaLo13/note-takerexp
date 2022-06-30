

const express = require('express').Router();
const { v4: uuid } = require('uuid');
const fs = require('fs');
const { stringify } = require('querystring');

express.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
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

express.post('/notes', (req, res) => {
    const { title, text } = req.body
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);
                fs.writeFile('db/db.json', JSON.stringify(parsedNote, null, 4), (err, data) => {
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

module.exports = express;