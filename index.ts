import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );


// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );


// Conectar DB

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/fotosgram';
} else {
    urlDB = process.env.MONGO_URI;
}

// Para trabajar en Riu
urlDB = 'mongodb+srv://user:user@cluster0.xbkbv.mongodb.net/fotosgram?retryWrites=true&w=majority'

mongoose.connect(urlDB, 
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

   if ( err ) throw err;

   console.log('Base de datos ONLINE');
})

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});