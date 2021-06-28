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

```sh
npm install
```

## 3. Guía de uso de la librería

La librería ***mdLinks*** recibe dos parámetros, el primero es una **ruta** que puede ser (absoluta/relativa) o  un **directorio** que contenga archivo(s) con extension **".md"**, y como segundo parámetro las **opciones** para: validar links, obtener las estadicticas, y ver la sección de ayuda. 

Ejemplo : 
```sh 
mdLinks <path-to-file> [options]
```

Una vez instalada la librería debe ingresar el siguiente comando de código para importarlo en su proyecto:

```sh 
const mdLinks = require('mdLinks')
```

#### Para las opciones (options):

El comportamiento por defecto no validar las URLs, solo identifica el archivo markdown (a partir de la ruta que recibe como argumento), analiza el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

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

Al ingresar `--help` muestra cuales son las opciones y que resuelve cada uno.

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

