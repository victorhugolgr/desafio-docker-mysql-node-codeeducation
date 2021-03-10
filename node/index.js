const express = require('express');
const app = express();
const port = 3000;
const configConnection = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(configConnection);
const sqlInsertPeaple = `INSERT INTO peaple(name) value ('Victor ' + current_date )`;
const sqlSelectPeaples = `SELECT NAME FROM PEAPLE as PEAPLE`;
const peaples = [];
connection.query(sqlInsertPeaple);
connection.query(sqlSelectPeaples, (error, results, fields)=>{
    if(error) throw error;
    if(results){
        for (let i = 0; i < results.length; i++) {
            peaples.push(results[i].peaple);
        }
    }
});


connection.end();

app.get('/', (req, res)=>{
    let body = `<h1>Full Cycle Rocks!</h1>`;
    body += `<h2>Lista de Pessoas</h2>`;
    if(peaples.length > 0){
        body += `<ul>`

        peaples.forEach(p=> body += `<li>${p}</li>`);

        body += `</ul>`
    }
   res.send(body);
});

app.listen(port, ()=>console.log('Rodando na porta ' + port));
