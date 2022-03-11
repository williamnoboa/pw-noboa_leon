import Producto from '../models/Productos'

export const createProducts = async(req, res) => {
    const { nombre, categoria, precio, imgUrl } = req.body
    const newProducto = new Producto({ nombre, categoria, precio, imgUrl })
    const productoGuardado = await newProducto.save();
    res.status(201).json(productoGuardado); //respuesta del cliente 
}


export const getProducts = async(req, res) => {
    const productos = await Producto.find();
    res.json(productos)
}

export const getProductsById = async(req, res) => {
    const productoById = await Producto.findById(req.params.productById);
    res.status(200).json(productoById)
}

export const putProductsById = async(req, res) => {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.productById, req.body, {
        //se le pasa 2 datos req.params.productById 
        new: true //Devuelve los nuevos datos actualizados 
    })
    res.status(200).json(productoActualizado)
}

export const deleteProductsById = async(req, res) => {
    const { productById } = req.params
    await Producto.findByIdAndDelete(productById)
    res.json('Producto Eliminado')
}
