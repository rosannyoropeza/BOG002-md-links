# Markdown Links

## Índice

* [1. Documentación técnica de la librería](#2-Documentación_técnica)
* [2. Guía de uso e instalación de la librería](#3-Guía_de_uso_e_instalación_de_la_librería)

***
## 1. Documentación técnica de la librería

Con ***mdLinks*** podras extraer los links que contengan los archivos **markdown(.md)** para validarlos y obtener como resultado la cantidad total de links, total rotos y total únicos.

La librería ***mdLinks*** recibe dos parámetros, el primero es una **ruta** que puede ser (absoluta o relativa), también puede introducir un **directorio** que contenga archivo(s) con extensión **".md"**, y como segundo parámetro las **opciones** para: validar links, obtener las estadísticas, y ver la sección de ayuda. 

La función retorna una promesa (Promise) que resuelve un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las siguientes propiedades:

```sh
Con validate : false :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
```
```sh
Con validate : true :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Mensaje fail en caso de fallo u ok en caso de éxito.
```

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

## 2. Guía de uso e instalación de la librería

Para instalar la librería debe ingresar la siguiente línea de comando en su proyecto:

```sh
npm install
```

Luego de realizar la intalación ingrese la ruta y las opciones en la consola, de la siguiente forma:

Ejemplo : 
```sh 
mdLinks <path-to-file> [options]
```

#### Para las opciones (options):

El comportamiento por defecto no valida las URLs, solo identifica el archivo markdown (a partir de la ruta que recibe como argumento), analiza el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

Por ejemplo:

```sh
$ mdLinks PRUEBA_TEST/dir_2/file2.md 
file2.md https://www.youtube.com/watch? youtube
file2.md https://www.google.com/?hl=es google
file2.md https://www.instagram.com/?hl= instagram
file2.md https://www.spotify.com/ spotify
file2.md https://twitter.com/?lang=es twitter
```
##### `--validate`

Si introduce la opción `--validate`, la libreria realiza una petición HTTP para
averiguar si el link funciona o no. 

Por ejemplo:

```sh
$ mdLinks PRUEBA_TEST/dir_2/file2.md --validate
┌─────────┬────────────┬──────────────────────────────────┬──────┬────────┬─────────────┐
│ (index) │    File    │               Href               │  Ok  │ Status │    Text     │
├─────────┼────────────┼──────────────────────────────────┼──────┼────────┼─────────────┤
│    0    │ 'file2.md' │ 'https://www.youtube.com/watch?' │ 'OK' │  200   │  'youtube'  │
│    1    │ 'file2.md' │ 'https://www.google.com/?hl=es'  │ 'OK' │  200   │  'google'   │
│    2    │ 'file2.md' │ 'https://www.instagram.com/?hl=' │ 'OK' │  200   │ 'instagram' │
│    3    │ 'file2.md' │    'https://www.spotify.com/'    │ 'OK' │  301   │  'spotify'  │
│    4    │ 'file2.md' │  'https://twitter.com/?lang=es'  │ 'OK' │  200   │  'twitter'  │
└─────────┴────────────┴──────────────────────────────────┴──────┴────────┴─────────────┘
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si introduce la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ mdLinks PRUEBA_TEST/dir_1/file1.md --stats
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│  Total  │   10   │
│ Unique  │   5    │
└─────────┴────────┘
```

También se puede combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ mdLinks PRUEBA_TEST/dir_1/file1.md --stats --validate
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│  Total  │   10   │
│ Unique  │   5    │
│ Broken  │   2    │
└─────────┴────────┘
```

##### `--help`

Al ingresar `--help` indicará los comandos que se pueden usar:

```sh
$ mdLinks PRUEBA_TEST/dir_1/file1.md --help

  ┌────────────────────┬──────────────────────────────────────────────────┐
  │      "file.md"     │ 'Archivo markdown a enviar por parámetro'        │
  │    --validate      │          'Muestra los links validados'           │
  │      --stats       │ 'Muestra el total de links y cuántos son únicos' │
  │ --stats --validate │   'Valida los links y muestra las estadística'   │
  └────────────────────┴──────────────────────────────────────────────────┘

INDICACIONES: Al ingresar la ruta asegúrese que sea válida y que esté dentro de comillas.
Ejemplo: "README.md", "C:\Users\romar\OneDrive\Documents\Carpeta de Prueba de directorio".
```