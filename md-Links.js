const path = require('path');
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const http = require('http');
const https = require('https');
const chalk = require('chalk');

const mdLinks = {

    // Verificando si es un file o un directorio
    arrayDir: [],

    getFiles: function (pathFile) {
        statsDirectory = fs.lstatSync(pathFile).isDirectory();
        if (statsDirectory) {
            const directory = fs.readdirSync(pathFile)
            for (let index in directory) {
                let nextDirectory = path.join(pathFile, directory[index]);
                if (path.extname(directory[index]) === ".md") {
                    mdLinks.arrayDir.push(pathFile + "\\" + directory[index]);
                }
                if (fs.lstatSync(nextDirectory).isDirectory()) {
                    mdLinks.getFiles(nextDirectory);
                }
            }
        }
        if (path.extname(pathFile) === ".md") {
            mdLinks.arrayDir.push(pathFile);
        }
        return mdLinks.arrayDir;
    },

    // Para leer el contenido del archivo recibido mediante la ruta
    readFileContent: function (arraydir) {
        const md = new MarkdownIt();
        let result;
        const dataLinks = [];
        arraydir.forEach(file => {
            const fileReading = new Promise(function (resolver) {
                const data = fs.readFileSync(file, { encoding: 'utf8' })
                result = md.render(data);
                const dom = new JSDOM(result);
                let Nodelinks = dom.window.document.querySelectorAll("a");
                Nodelinks.forEach((link) => {
                    if (link.href.startsWith("http")) {
                        dataLinks.push({
                            href: link.href,
                            text: link.textContent,
                            file: file,
                        })
                    }
                })
                resolver(dataLinks);
            });
        });
        return Promise.all(dataLinks);
    },

    // Para realizar petición http 
    validateStatusLinks: function (fileContent) {
        const newArrObj = [];
        fileContent.forEach((link) => {
            if (link.href.startsWith('https')) {
                const myURL = new URL(link.href);
                let objRequest = "";
                if (myURL.protocol === 'http') {
                    objRequest = http;
                }
                else {
                    objRequest = https;
                }
                const httpsGet = new Promise(function (resolver) {
                    objRequest.get(link.href, function (res) {
                        res.on('data', () => {
                            let message = '';
                            if (res.statusCode >= 200 && res.statusCode <= 399) {
                                message = 'OK';
                            }
                            else {
                                message = 'Fail';
                            }
                            const newObj = {
                                href: link.href,
                                text: link.text,
                                file: link.file,
                                status: res.statusCode,
                                ok: message,
                            }
                            resolver(newObj);
                        });

                        // Toda la respuesta ha sido recibida. Imprimir el resultado.
                        res.on('end', () => {
                            resolver(link)
                        });

                    })
                        .on('error', function (e) {
                            const newObj = {
                                href: link.href,
                                text: link.text,
                                file: link.file,
                                status: 'Este Link no existe',
                                ok: 'Fail'
                            }
                            resolver(newObj);
                        });
                });
                newArrObj.push(httpsGet);
            }
        });
        return Promise.all(newArrObj);
    },

    main: function (pathFile, options) {
        // Convirtiendo una ruta relativa a ruta absoluta
        return new Promise(function (resolver, rechazar) {

            if (!fs.existsSync(pathFile)) {
                // throw Error("El archivo ¡NO EXISTE!");
                console.log(chalk.red("El archivo ¡NO EXISTE!"));
                console.log(chalk.yellow('RECUERDE : El path debe ser un string.'));
                return
            }

            if (path.isAbsolute(pathFile) === false) {
                pathFile = path.resolve(pathFile);
            }

            const files = mdLinks.getFiles(pathFile);
            mdLinks.readFileContent(files).then((arrayDir) => {
                if (options.validate === true) {
                    mdLinks.validateStatusLinks(arrayDir).then((fileContent) => {
                        resolver(fileContent);
                    });
                }
                else {
                    resolver(arrayDir);
                }
            }).catch((error) => {
                console.log(error)
            });
        });
    }
};

module.exports = mdLinks;

