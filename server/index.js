const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'plemployeedb'
});

app.post('/create', (req, res) => {
    db.query('INSERT INTO EMPLOYEES (firstName, lastName, email, phoneNumber, title, department, city, state) VALUES (?,?,?,?,?,?,?,?)', 
    [
        req.body.data.firstName, 
        req.body.data.lastName,
        req.body.data.email, 
        req.body.data.phoneNumber,
        req.body.data.title,
        req.body.data.department,
        req.body.data.city,
        req.body.data.state
    ], 
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send("Employee created");
        }
    })
});

app.post('/update', (req, res) => {
    db.query('UPDATE EMPLOYEES SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, title = ?, department = ?, city = ?, state = ? where id = ?', 
    [
        req.body.data.firstName, 
        req.body.data.lastName,
        req.body.data.email, 
        req.body.data.phoneNumber,
        req.body.data.title,
        req.body.data.department,
        req.body.data.city,
        req.body.data.state,
        req.body.data.id
    ], 
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send("Employee updated");
        }
    })
});

app.post('/delete', (req, res) => {
    db.query('DELETE FROM EMPLOYEES where id = ?', [req.body.id], 
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send("Employee deleted");
        }
    })
});


app.get('/employees', (req, res) => {
    db.query('SELECT id, firstName, lastName, email, phoneNumber, title, department, city, state from EMPLOYEES', 
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
})