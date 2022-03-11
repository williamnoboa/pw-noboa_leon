import jwt, { decode } from 'jsonwebtoken'
import config from '../config'
import User from "../models/Usuario";

export const verifyToken = async(res, req, next) => {
    const token = req.headers["x-access-token"];

    console.log(token)

    if (!token) return res.status(403).json({ message: "No hay token" })
    const decoded = jwt.verify(token.config.secret)

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" })

    next()
}