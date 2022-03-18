// const express = require('express');
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv';

dotenv.config({path:"variables.env"});

const app = express();

//Conextar la base de datos
db.authenticate()
    .then( () =>console.log('Bases de datos conectada') )
    .catch( error => console.log(error) )

//Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000

// const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    next();
});

//Agregar body parser pra leer los datos del formulario
app.use(express.urlencoded({entended: true}))

//Definir la carpeta publica
app.use(express.static('public'))
app.use('/viajes', express.static('public'));

//Agregar router
app.use('/', router);


app.listen(port, host, () => {
    console.log('El servidor esta funciojnando.');
})
// app.listen(port, () => {
//     console.log(`El servidor esta funcionando en el puerto ${port}`);
// })