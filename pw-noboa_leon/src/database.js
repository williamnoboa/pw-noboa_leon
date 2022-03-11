import mongoose from "mongoose";


mongoose.connect("mongodb://localhost/WorkApi", {
        // useNewUrlParser: true,
        // useUnifiedTopoly: true,
        // useFindAndModify: true,
        // useCreateIndex: true,
    })
    .then(db => console.log('Conectado a la base de datos'))
    .catch(db => console.error('Hubo un error al conectarse a la base de datos'))