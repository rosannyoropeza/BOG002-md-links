#!/usr/bin/env node
// const mdLinks = require("./md-Links");
const path = require('path');
const chalk = require('chalk');
const mdLinks = require("./duplicate");

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

if (help)
{
  //MUESTRAR TABLA INFORMATIVA
  const helps = {
    "--validate": "Muestra los links validados",
    "--stats": "Muestra el total de links y cuantos son únicos",
    "--stats --validate": "Valida los links y muestra las estadística"
  }

  console.table(helps);
} 
else 
{
  if (stats && validate) 
  {
    //MOSTRAR ESTADISTICAS Y VALIDACION 
    mdLinks.main(pathFile, { validate: true }).then((res) => {
      //TOTAL
      console.log("Total: ", res.length)

      //UNICOS
      const arrayLinks =  res.map((link) => { return link.href } )
      const linksUnicos =  arrayLinks.filter((link, index, array) => { return array.indexOf(link) === index; } )
      console.log("Unique: ", linksUnicos.length)

      //ROTOS
      const arrayLinkStatus =  res.map((link) => { return link.ok })
      console.log("soy fail", arrayLinkStatus)
      const linksRotos =  arrayLinkStatus.filter((link) => { 
        if(link === 'Fail')
       return link;
      });
      console.log("Broken: ", linksRotos.length);
    });
  } 
  else 
  {
    if (stats) 
    {
      //MOSTRAR ESTADISTICAS 
      mdLinks.main(pathFile, { validate: true }).then((res) => {
        //TOTAL
        console.log("Total: ", res.length);

        //UNICOS
        const arrayLinks =  res.map((link) => { return link.href });
        const linksUnicos =  arrayLinks.filter((link, index, array) => { return array.indexOf(link) === index; });
        console.log("Unique: ", linksUnicos.length);
      });
    } 
    else 
    {
      //LINKS VALIDADOS
      if (validate)
      {
        mdLinks.main(pathFile, { validate: true }).then((res) => {
          res.forEach(link => {
            const fileName = path.parse(link.file);
            console.log(chalk.blue(fileName.base), chalk.green(link.href), chalk.yellow(link.status), chalk.red(link.ok), chalk.magenta(link.text));
          });
        });
      }
      else 
      {
        //LINKS SIN VALIDAR
        mdLinks.main(pathFile, options).then((res) => {
          res.forEach(link => {
            const fileName = path.parse(link.file);
            console.log(chalk.blue(fileName.base), chalk.green(link.href), chalk.magenta(link.text));
          });
        });
      }
    }

  }
}

