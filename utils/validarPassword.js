export const validarPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(password);
}

console.log(validarPassword('Andres'));
console.log(validarPassword('andRes1103'));


