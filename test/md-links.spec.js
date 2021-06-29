const { validateStatusLinks } = require('../md-Links');
const mdLinks = require('../md-Links');
const file = '../PRUEBA_TEST/dir_1/file1.md';
const dir = './PRUEBA_TEST'
const file5 = '../PRUEBA_TEST/dir_2/file5.md';
const arrayObj = [
    {
        href: "https://google.com/",
        text: "Google",
        file: "C:\\Users\\romar\\OneDrive\\Documents\\Carpeta de Prueba de directorio\\text_md\\README_MDLINKS.md"
    }];

const arrayValidado = [{
    "file": "C:\\Users\\romar\\OneDrive\\Documents\\Carpeta de Prueba de directorio\\text_md\\README_MDLINKS.md",
    "href": "https://google.com/",
    "ok": "OK",
    "status": 301,
    "text": "Google"
}]

describe('mdLinks.main', () => {
    jest.setTimeout(200000);
    it('Deberia retornar una ruta absoluta', () => {
        expect(typeof mdLinks.main('README.md', { validate: true })).toBe("object");
    });
    it('Deberia retornar un string El archivo ¡NO EXISTE!', () => {
        return mdLinks.main("1234.md", { validate: true }).catch((error) => {
            expect(error).toEqual("El archivo ¡NO EXISTE!");
        });
    });
    it('Deberia devolver un array de archivos .md', () => {
        const directory = ["C:\\Users\\romar\\OneDrive\\Documents\\BOG002-md-links\\README.md", "PRUEBA_TEST\\dir_1\\file1.md", "PRUEBA_TEST\\dir_2\\file2.md", "PRUEBA_TEST\\dir_2\\file3.md", "PRUEBA_TEST\\dir_2\\file4.md", "PRUEBA_TEST\\dir_2\\file5.md"];
        expect(mdLinks.getFiles(dir)).toEqual(directory);
    });
    it('Deberia retornar un array de objetos al realizar una petición HTTP', () => {
        return mdLinks.validateStatusLinks(arrayObj).then((res) => {
            expect(res).toEqual(arrayValidado);
        });
    });
})
