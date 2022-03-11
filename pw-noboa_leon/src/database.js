import mongoose from "mongoose";


mongoose.connect("mongodb://localhost/WorkApi", {
        // useNewUrlParser: true,
        // useUnifiedTopoly: true,
        // useFindAndModify: true,
        // useCreateIndex: true,
    })
    .then(db => console.log('Conectado en la base'))
    .catch(db => console.error('Error al conectarse a la base de datos'))
