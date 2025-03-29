import { UserModel } from "../models/user.model.js";
import { validarPassword } from "../utils/validarPassword.js";

// /api/register
const register = async(req, res) => {
    try{
        console.log(req.body);
        const {id_usuario, nombre, apellido, email,
            contrasenia, contrasenia_ver, fecha_registro, fecha_nacimiento} = req.body;

        const rol = 1;  //por defecto los usuario nuevos van a tener el rol_id 1 que es usuario

        
        const campos_obligatorios = {id_usuario, nombre, apellido, email,contrasenia, contrasenia_ver, fecha_registro, fecha_nacimiento};
        
        if(Object.values(campos_obligatorios).some(valor => !valor)){
            return res.status(400).json({ok: false, msg: 'Todos los campos son obligatorios'})
        }

        //contrasenia_ver -> en el register aparecerá un campo para ingresar contrasenia y otro para volver a ingresar la contrasenia que validará que sean iguales
        if(contrasenia !== contrasenia_ver){
            return res.status(400).json({ok: false, msg: 'Las contraseñas no coinciden'})   //mejorar codigo de estado
        }

        if(!validarPassword(contrasenia)){
            return res.send(400).json({
                ok: false, 
                msg: "La contraseña debe tener al menos 8 caracteres, una minuscula, una mayuscula y un número"
            })
        }

        const user = await UserModel.findOneByEmail(email);

        if(user)return res.send()
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