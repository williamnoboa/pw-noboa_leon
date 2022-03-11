import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }],
    }, {
        timestamps: true, //Se añade fecha, hora y registro
        versionKey: false //Se oculta el tipo de version 
    }

);
userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10) //Se aplicara el algoritmo unas diez veces
    return await bcrypt.hash(password, salt) //cifamos la contrasena
}

//Comparamos la contraseña cifrada con  el usuario 
userSchema.statics.comparePassword = async(password, receivedPassword) => {
    //password es la contrasena que se uso
    return await bcrypt.compare(password, receivedPassword)
}

export default userSchema;
