# Markdown Links

## Índice

* [1. ¿De que se trata la Libreria?](#1-Libreria)
* [2. Documentación técnica de la librería](#2-Documentación_técnica)
* [3. Guía de uso e instalación de la librería](#3-Guía_de_uso_e_instalación_de_la_librería)
* [4. Guía de uso de la librería](#4-Guía_de_uso_de_la_librería)

***
## 1. ¿De que se trata la Libreria?

Con esta librería podras extraer archivos **markdown(.md)** para validar los links que estos contenga y mostrar como resultado la cantidad total de links, así como los links rotos y únicos.

## 2. Documentación técnica de la librería


## 3. Instalación de la librería

`npm install`

## 3. Guía de uso de la librería

mdLinks recibe dos parámetros, el primero es una **ruta** que puede ser (absoluta/relativa) o  un **directorio** que contenga archivo(s) con extension **".md"**, y como segundo parámetro las **opciones** para: validar links, obtener las estadicticas, y ver la sección de ayuda. 

Ejemplo : `mdLinks <path-to-file> [options]`

Una vez instalada la librería debe ingresar el siguiente comando de código para importarlo en su proyecto:

`const mdLinks = require('mdLinks')`

#### Para las opciones (options):

##### `--validate`

Si introduce la opción `--validate`, la libreria realiza una petición HTTP para
averiguar si el link funciona o no. 

Por ejemplo:

```sh
romar@DESKTOP-K5FMT1M MINGW64 ~/OneDrive/Documents/BOG002-md-links (main)
$ mdLinks PRUEBA_TEST --validate
file1.md https://es.wikipedia.org/wiki/Markdown 200 OK Markdown
file1.md https://nodejs.org/es/ 200 OK Node.js
file1.md https://nodejs.orooog/api/fs.html Este Link no existe Fail fs
file1.md https://www.npmjbbbs.com/ Este Link no existe Fail npm
file1.md https://jestjs.io/docs/es-ES/manual-mocks 301 OK Uso de librerias de Mock.
file1.md https://es.wikipedia.org/wiki/Markdown 200 OK Markdown
file1.md https://nodejs.org/es/ 200 OK Node.js
file1.md https://nodejs.orooog/api/fs.html Este Link no existe Fail fs
file1.md https://www.npmjbbbs.com/ Este Link no existe Fail npm
file1.md https://jestjs.io/docs/es-ES/manual-mocks 301 OK Uso de librerias de Mock.
file2.md https://www.youtube.com/watch?v=VENMwSF15WU&t=4939s 200 OK youtube
file2.md https://www.google.com/?hl=es 200 OK google
file2.md https://www.instagram.com/?hl=es-la 200 OK instagram
file2.md https://www.spotify.com/ 301 OK spotify
file2.md https://twitter.com/?lang=es 200 OK twitter
file3.md https://www.espn.com/ 200 OK espn
file3.md https://www.directvsports.com/ 200 OK directvsports
file3.md https://www.foxsports.com/ 200 OK foxsports
file3.md https://www.realmadrid.com/ 200 OK realmadrid
file3.md https://www.winsports.co/ 200 OK winsports
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si introduce la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
romar@DESKTOP-K5FMT1M MINGW64 ~/OneDrive/Documents/BOG002-md-links (main)
$ mdLinks PRUEBA_TEST --stats
Total:  20
Unique:  15
```

También se puede combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
romar@DESKTOP-K5FMT1M MINGW64 ~/OneDrive/Documents/BOG002-md-links (main)
$ mdLinks PRUEBA_TEST --stats --validate
Total:  20
Unique:  15
Broken:  2 
```

##### `--help`

Al ingresar `--help` muestra cuales son las opciones y que resuelve cada uno.

```sh
romar@DESKTOP-K5FMT1M MINGW64 ~/OneDrive/Documents/BOG002-md-links (main)
$ mdLinks PRUEBA_TEST --help
┌────────────────────┬──────────────────────────────────────────────────┐
│      (index)       │                      Values                      │
├────────────────────┼──────────────────────────────────────────────────┤
│     --validate     │          'Muestra los links validados'           │
│      --stats       │ 'Muestra el total de links y cuántos son únicos' │
│ --stats --validate │   'Valida los links y muestra las estadística'   │
└────────────────────┴──────────────────────────────────────────────────┘
Indicaciones : Al ingresar la ruta asegúrese que sea válida y que esté dentro de comillas. Ejemplo: "README.md", "C:\Users\romar\OneDrive\Documents\Carpeta de Prueba de directorio".
```

