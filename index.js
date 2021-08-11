const express = require('express');
const bodyParse = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}))

const path = './data.json';

const SaveData = (data) => {
    let stringify = JSON.stringify(data)
    fs.writeFileSync(path, stringify)
}

const GetData = () => {
    let json = fs.readFileSync(path);
    return JSON.parse(json)
}

app.get ('/users', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            throw err
        }
        res.send(JSON.parse(data))
    })
})

app.post('/users', (req, res) => {

    let getdata = GetData();

    const id = uuidv4();

    getdata[id] = req.body;

    SaveData(getdata)
    res.send( {message: 'ok'} )
})

app.put('/users/:id', (req, res) => {
   
    let id = req.params.id;
    let getdata = GetData();

    getdata[id].username = req.body.username;
    getdata[id].email = req.body.email;
    getdata[id].password = req.body.password;

    SaveData(getdata)
    res.send( {message: 'ok'} )
})

app.delete('/users/:id', (req, res) => {
   
    let id = req.params.id;
    let getdata = GetData();
    delete getdata[id];

    SaveData(getdata)
    res.send( {message: 'ok'} )
})

app.listen(8181, () => {
    console.log ("server start")
})