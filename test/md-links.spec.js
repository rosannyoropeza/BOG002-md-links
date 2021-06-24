const mdLinks = require('../duplicate');
const file = '../PRUEBA_TEST/dir_1/file1.md';
const dir = './PRUEBA_TEST'

const arrayObj = [
    {
        href: 'https://google.com/',
        text: 'Google',
        file: 'C:\\Users\\romar\\OneDrive\\Documents\\Carpeta de Prueba de directorio\\text_md\\README_MDLINKS.md'
    },
    {
        href: 'https://www.youtube.com',
        text: 'youtube',
        file: 'C:\Users\romar\OneDrive\Documents\Carpeta de Prueba de directorio\text_md\README_MDLINKS.md',
    }
];

describe('mdLinks.main', () => {
    jest.setTimeout(30000);
    it('Deberia retornar una ruta absoluta', () => {
        expect(typeof mdLinks.main('README.md', { validate: true })).toBe("object");
    });
    // it('Deberia retornar una promesa de array de objetos', () => {
    //     let pathName = 'C:\\Users\\romar\\OneDrive\\Documents\\Carpeta de Prueba de directorio\\text_md\\README_MDLINKS.md';
    //     expect(mdLinks.main(pathName, { validate: 'true' })).toBe(arrayObj);
    // });
    it('Deberia retornar un validateStatusLinks', async () => {

        const arrayValidado = [{
            "file": "C:\\Uses\\romar\\OneDrive\\Documents\\Carpeta de Prueba de directorio\\text_md\\README_MDLINKS.md",
            "href": "http://google.com/",
            "ok": "OK",
            "status": 200,
            "text": "Google"
        },
        {
            href: 'https://www.youtube.com',
            text: 'youtube',
            file: 'C:\Users\romar\OneDrive\Documents\Carpeta de Prueba de directorio\text_md\README_MDLINKS.md',
            status: '400',
            ok: 'fail'
        }]

        mdLinks.validateStatusLinks(arrayObj).then((res) => {
            expect(res).toEqual(arrayValidado);
        }).catch((rej) => {
            expect(rej).toEqual();
        })
    }, 10000);
    it('Deberia devolver un array de archivos .md', () => {
        const directory = ["C:\\Users\\romar\\OneDrive\\Documents\\BOG002-md-links\\README.md", "PRUEBA_TEST\\dir_1\\file1.md","PRUEBA_TEST\\dir_2\\file2.md","PRUEBA_TEST\\dir_2\\file3.md"];
        expect(mdLinks.getFiles(dir)).toEqual(directory); 
    });
});



