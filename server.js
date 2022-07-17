const express = require ('express');
const path = require ('path');
const api = require('./routes/routes');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//route for index (homepage)
app.get('/', (req, res) =>
{res.sendFile(path.join(__dirname, './public/index.html'))}
);

// route for notes
app.get('/notes', (req, res) =>
{res.sendFile(path.join(__dirname, './public/notes.html'))}
);


// link that will pop up in terminal
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);