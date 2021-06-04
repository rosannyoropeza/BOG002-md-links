// module.exports = () => {
//   // ...
// };

// Enviar Parámetros desde la terminal (Node)
const param1 = process.argv[0]; // PARA CAPTURAR NODE
const param2 = process.argv[1]; // PARA CAPTURAR LA RUTA ABSOLUTA DEL ARCHIVO QUE SE EJECUTA
let param3 = process.argv[2]; // PARA 1ER PARAMETRO
let param4 = process.argv[3]; // PARA 2DO PARAMETRO

console.log(param1, param2, param3, param4)