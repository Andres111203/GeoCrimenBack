import { UserModel } from "../models/user.model.js";
import { validarPassword } from "../utils/validarPassword.js";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
// /api/register
const register = async(req, res) => {
    try{
        console.log(req.body);
        const {id_usuario, nombre, apellido, email,
            contrasenia, contrasenia_ver, fecha_nacimiento} = req.body;
    
        const fecha_registro = new Date();
        const rol_id = 1;  //por defecto los usuario nuevos van a tener el rol_id 1 que es usuario

        
        const campos_obligatorios = {id_usuario, nombre, apellido, email,contrasenia, contrasenia_ver, fecha_nacimiento};
        
        if(Object.values(campos_obligatorios).some(valor => !valor)){
            return res.status(400).json({ok: false, msg: 'Todos los campos son obligatorios'})
        }

        //contrasenia_ver -> en el register aparecerá un campo para ingresar contrasenia y otro para volver a ingresar la contrasenia que validará que sean iguales
        if(contrasenia !== contrasenia_ver){
            return res.status(400).json({ok: false, msg: 'Las contraseñas no coinciden'})   //mejorar codigo de estado
        }

        if(!validarPassword(contrasenia)){
            return res.status(400).json({
                ok: false, 
                msg: "La contraseña debe tener al menos 8 caracteres, una minuscula, una mayuscula y un número"
            })
        }

        

        const user = await UserModel.findOneByEmail(email);

        if(user){
            return res.status(409).json({
            ok: false,
            msg: "el usuario ya está registrado"
        })}

        const salt = await bycript.genSalt(10)
        const hashedPAssword = await bycript.hash(contrasenia, salt)

        const nuevoAvion = await UserModel.create({id_usuario, nombre, apellido, email, contrasenia: hashedPAssword,rol_id, fecha_registro, fecha_nacimiento})
        return res.json({ok: true, msg: nuevoAvion})

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error server'
        })
        
    }

}

const login = async(req, res) => {
    try{
        const {email, contrasenia} = req.body;
        const usuario = await UserModel.findOneByEmail(email)

        if(!usuario){
            return res.status(400).json({ok: false, msg: "el usuario no está registrado"})
        }
        if(!email || !contrasenia){
            return res.status(400).json({ok:false, msg: "Todos los campos son obligatorios"})
        }

        const isEqual = await bycript.compare(contrasenia, usuario.contrasenia)
        if(!isEqual){
            return res.status(400).json({ok: false, msg:"Contraseña incorrecta"})
        }

        const token = jwt.sign({
            email: usuario.email, role: usuario.rol_id
        },
            process.env.KEY_JWT,
            {
                "expiresIn": "1h"
            }
    )
    }catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg: "error del servidor"})
    }
}

export const UserController = {
    register,
    login

}