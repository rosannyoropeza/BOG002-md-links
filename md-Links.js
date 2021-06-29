const path = require('path');
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const http = require('http');
const https = require('https');

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
        let dataLinks = {};
        const arrDataLinks = [];
        arraydir.forEach(file => {
            const fileReading = new Promise(function (resolver, rechazar) {

                const data = fs.readFileSync(file, { encoding: 'utf8' })
                result = md.render(data);
                const dom = new JSDOM(result);
                let Nodelinks = dom.window.document.querySelectorAll("a");
                Nodelinks.forEach((link) => {
                    dataLinks = {
                        href: link.href,
                        text: link.textContent,
                        file: file,
                    }
                    arrDataLinks.push(dataLinks)
                    resolver(arrDataLinks);
                })
            });

        });
        return Promise.all(arrDataLinks);
    },

    // Para realizar petición http
    validateStatusLinks: function (fileContent) {
        const newArrObj = [];
        fileContent.forEach((link) => {
            if (link.href.startsWith('http')) {
                let objRequest = http;
                const myURL = new URL(link.href);
                if (myURL.protocol === 'https:') {
                    objRequest = https;
                }
                const httpsGet = new Promise(function (resolver) {
                    objRequest.get(link.href, function (res) {
                        res.on('data', () => {
                            let message = 'Fail';
                            if (res.statusCode >= 200 && res.statusCode <= 399) {
                                message = 'OK';
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
                        // res.on('end', (newObj) => {
                        //     resolver(newObj)
                        // });
                    }).on('error', function (e) {
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
        return new Promise(function (resolver, rechazar) {
            
            // Verificando si la ruta existe
            if (!fs.existsSync(pathFile)) {
                rechazar("El archivo ¡NO EXISTE!");
            }
            
            // Convirtiendo una ruta relativa a ruta absoluta
            if (path.isAbsolute(pathFile) === false) {
                pathFile = path.resolve(pathFile);
            }

            const files = mdLinks.getFiles(pathFile);
            mdLinks.readFileContent(files).then((arrayDir) => {
                if (arrayDir.length === 0) {
                    rechazar("El archivo ¡No contiene Links!");
                }
                if (options.validate === true) {
                    mdLinks.validateStatusLinks(arrayDir).then((fileContent) => {
                        resolver(fileContent);
                    });
                }
                else {
                    resolver(arrayDir);
                }
            }).catch((error) => {
                rechazar("Error desconocido:" + error);
            });
        });
    }
};

module.exports = mdLinks;

