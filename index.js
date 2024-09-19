const path =require('path')

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

//Crear el servidor de express

const app = express();

// Basde de datos
dbConnection();

//CORS

app.use(cors())


//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.use('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
//TODO: auth // crear, login, renew
//TODO: CRUD: Eventos


// escuchar

app.listen( process.env.PORT , ()=> {
    console.log(`Servidor funcionando en el puerto ${process.env.PORT}`)
} )