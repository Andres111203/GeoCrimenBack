import { UserModel } from "../models/user.model.js";


// /api/register
const register = async(req, res) => {
    try{
        console.log(req.body);
        const {id_usuario, nombre, apellido, email,
            contrasenia,fecha_registro, fecha_nacimiento} = req.body;

        const rol = 1;


        return res.json({ok: true, msg: 'user ok'})
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error server'
        })
        
    }

}

export const UserController = {
    register

}