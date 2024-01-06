const mongoose = require("mongoose"); //*Si o si mongoose

const dbConnectNoSql = () =>{
    const DB_URI = process.env.DB_URI; //*Obtener la variable de entorno desde el archivo.env
    mongoose.connect(DB_URI/*url(te lo da la atlas)*/,{
        useNewUrlParser: true,   /*Siempre tiene que tener*/
        useUnifiedTopology: true, /*Siempre tiene que tener*/
    },
    (err, res)=>{
        if(!err){
            console.log('**** CONEXION CORRECTA ****')
        } else{
            console.log('**** ERROR DE CONEXION ****')
        }
    }
    )
}

module.exports = dbConnectNoSql /* Siempre has el module.exports */

// mongodb+srv://jhoncruz:7Pyk8lNowlaLAaSr@cluster0.vkaqi.mongodb.net/dbapi?retryWrites=true&w=majority