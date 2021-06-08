// module.exports = () => {
//   // ...
// };

const path = require('path');
const fs = require('fs')

// Enviar Parámetros desde la terminal (Node)
const param1 = process.argv[0]; // PARA CAPTURAR NODE
const param2 = process.argv[1]; // PARA CAPTURAR LA RUTA ABSOLUTA DEL ARCHIVO QUE SE EJECUTA
let param3 = process.argv[2]; // PARA 1ER PARAMETRO
let param4 = process.argv[3]; // PARA 2DO PARAMETRO

console.log(param1, param2, param3, param4)

// Convirtiendo una ruta relativa a ruta absoluta
if (path.isAbsolute(param3) === false){
  param3 = path.resolve(param3)
}

console.log("soy ruta convertida", param3)
