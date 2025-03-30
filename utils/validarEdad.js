

const validarEdad = (fecha_nacimiento) => {
    const f = new Date();
    let resta_fechas = f.getTime() - fecha_nacimiento.getTime()
    let edad = Math.round(resta_fechas/ (1000* 60* 60* 24))
    return edad
}

let fecha = new Date('11/11/2003');
console.log(validarEdad(fecha));