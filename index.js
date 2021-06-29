#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const mdLinks = require("./md-Links");

let pathFile = process.argv[2]; // PARA 1ER PARAMETRO
let validate = false;
let help = false;
let stats = false;

const params = process.argv; // PARA 2DO y 3ER PARAMETRO
params.forEach((param) => {
  if (param === '--validate') {
    validate = true;
  }
  if (param === '--help') {
    help = true;
  }
  if (param === '--stats') {
    stats = true;
  }
})

options = {
  'validate': validate,
  'stats': stats,
  'help': help,
}

if (help) {
  //MUESTRAR TABLA INFORMATIVA
  const helps = `
  ┌────────────────────┬──────────────────────────────────────────────────┐
  │      "file.md"     │ 'Archivo markdown a enviar por parámetro'        │
  │    --validate      │          'Muestra los links validados'           │
  │      --stats       │ 'Muestra el total de links y cuántos son únicos' │
  │ --stats --validate │   'Valida los links y muestra las estadística'   │
  └────────────────────┴──────────────────────────────────────────────────┘
`;
  console.log(chalk.greenBright(helps));
  console.log(chalk.white('INDICACIONES: Al ingresar la ruta asegúrese que sea válida y que esté dentro de comillas.'));
  console.log(chalk.white('Ejemplo: "README.md", "C:\\Users\\romar\\OneDrive\\Documents\\Carpeta de Prueba de directorio".'));
}
else {
  if (stats && validate) {
    //MOSTRAR ESTADISTICAS Y VALIDACION 
    mdLinks.main(pathFile, { validate: true }).then((res) => {
      //TOTAL
      const total = res.length;

      //UNICOS
      const arrayLinks = res.map((link) => { return link.href })
      const linksUnicos = arrayLinks.filter((link, index, array) => { return array.indexOf(link) === index; })
      const unicos = linksUnicos.length;

      ////ROTOS
      const arrayLinkStatus = res.map((link) => { return link.ok })
      const linksRotos = arrayLinkStatus.filter((link, index, array) => { return array.indexOf(link) === index; })
      const rotos = linksRotos.length;

      console.table({ Total: total, Unique: unicos, Broken: rotos });
    }).catch((err) => {
      console.log(chalk.red(err));
    });
  }
  else {
    if (stats) {
      //MOSTRAR ESTADISTICAS 
      mdLinks.main(pathFile, { validate: true }).then((res) => {
        //TOTAL
        const total = res.length;

        //UNICOS
        const arrayLinks = res.map((link) => { return link.href });
        const linksUnicos = arrayLinks.filter((link, index, array) => { return array.indexOf(link) === index; });
        const unicos = linksUnicos.length;

        console.table({ Total: total, Unique: unicos });
      }).catch((err) => {
        console.log(chalk.red(err));
      });
    }
    else {
      //LINKS VALIDADOS
      if (validate) {
        mdLinks.main(pathFile, { validate: true }).then((res) => {
          let linksValidate = [];
          res.forEach(link => {
            const fileName = path.parse(link.file);
            linksValidate.push({
              File: fileName.base,
              Href: link.href.slice(0, 30),
              Ok: link.ok,
              Status: link.status,
              Text: link.text.slice(0, 50)
            })
          })
          console.table(linksValidate);
        }).catch((err) => {
          console.log(chalk.red(err));
        });
      }
      else {
        //LINKS SIN VALIDAR
        mdLinks.main(pathFile, options).then((res) => {
          res.forEach(link => {
            //const fileName = path.parse(link.file);
            console.log(chalk.cyan(link.file.substr(50, 50)), chalk.greenBright(link.href.substr(0, 30)), chalk.magenta(link.text.substr(0, 50)));
          });
        }).catch((err) => {
          console.log(chalk.red(err));
        });
      }
    }
  }
}
