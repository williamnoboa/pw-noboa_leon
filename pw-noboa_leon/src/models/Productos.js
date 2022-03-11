import { Schema, model } from "mongoose";

const SchemaProducto = new Schema({
    nombre: String,
    categoria: String,
    precio: Number,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Producto', SchemaProducto)