import User from "../models/Usuario";
import jwt from 'jsonwebtoken'
import config from "../config";
import Roles from "../models/Roles";

//Registro de usuario
export const signup = async(res, req) => {
    const { username, email, password, roles } = req.body

    // const userFound = User.find({ email })

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    //Comprobando si el usuario envia un rol existente
    if (roles) {
        const foundRoles = await Roles.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id) //buscando id del rol
    } else {
        const role = await Roles.findOne({ name: "usuario" }) //asignandole rol predeterminado
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save(); //usuario guardado
    console.log(savedUser)

    //que va a guardar, palabra secreta para generar token, objeto de configuracion
    const token = jwt.sign({ id: savedUser._id }, config.secret, {
        expiresIn: 86400 //1 dia de expiracion en sec
    })
    res.status(200).json({ token })
}


//Inicio de sesion 
export const signin = async(res, req) => {
    const userFound = await User.findOne({ email: req.body.email }).populate("roles")

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" })


    //Si el usuario y contraseña son correctos se genera el token de ingreso
    const token = jwt.sign({ id: userFound._id }, config.secret, {
        expiresIn: 86400
    })

    res.json({ token })
}
