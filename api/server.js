const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const { Notes } = require('./models');

const app = express();

const PORT = 3000 || process.env.PORT;
const DB_URL = 'mongodb://110.232.113.228:27017';

/**
 * Mongoose Connect To DB
 */
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

if(mongoose.connection){
    console.log(`DB connection to ${DB_URL} is successful`);
}

app.use(bodyparser.json());

/**
 * ADD CORS
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    next();
});

app.listen(PORT, (error) => {
    if(error) console.error(`Error starting express JS server`);
    console.log(`Express server running on port: ${PORT}`);
});

// get notes
app.get('/notes', (req, res) => {
    Notes.Notes.find({}).then((noteDocument) => {
        res.send(noteDocument); 
    }); 
});

app.get('/notes/:id', async (req, res) => {
    try{
        const activity = await Notes.Notes.findById({ _id: req.params.id }).exec();
        res.json(activity).send();
    }catch(error){}
});

// post notes
app.post('/notes', (req, res) => {
    let title = req.body.title;
    let text = req.body.text;
    let newNote = new Notes.Notes({ title, text });
    newNote.save().then((noteDocument) => {
        res.send(noteDocument);
    });
});  

app.delete('/notes', async(req, res) => {
    try{
        const deleteActivity = await Notes.Notes.deleteMany({});
        res.json(deleteActivity).send();
    }catch(error){}
});

// patch note using :id
app.patch('/notes/:id', (req, res) => {
    let options = { useFindAndModify: false, new: true }
    Notes.Notes.findOneAndUpdate({ _id: req.params.id } , {
        $set: req.body
    }, options).then(() => {
        res.json(req.body).send();
    });
});

// delete note using :id
app.delete('/notes/:id', async (req, res) => {
    try{
        const deleteOneDocument = await Notes.Notes.deleteOne({ _id: req.params.id });
        res.json(deleteOneDocument).send();
    }catch(error){}
});