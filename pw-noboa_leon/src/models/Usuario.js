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
        timestamps: true, //añade hora y fecha de actualizacion y registro
        versionKey: false //oculta el tipo de version que se uso 
    }

);
userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10) //10veces se aplicara el algoritmo
    return await bcrypt.hash(password, salt) //cifrando contrasena
}

//Comparar la contraseña cifrada con la que el usuario escribira en el input para que coincidan
//si coinciden true y sino false
userSchema.statics.comparePassword = async(password, receivedPassword) => {
    //password es la contrasena guardada que esta cifrada y receivedPassword es la que 
    //el usuario esta escribiendo para ser comparada con la que esta guardada y que coincidan 
    return await bcrypt.compare(password, receivedPassword)
}

export default userSchema;
