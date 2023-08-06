const path = require('path'); // подключаем модуль для работы с путями

console.log(path.dirname(__filename)); // получаем путь до текущей директории
console.log(path.basename(__filename)); // получаем название текущего файла
console.log(path.extname(__filename).slice(1)); // получаем расширение текущего файла без точки
console.log(path.parse(__filename)); // получаем объект с данными о текущем файле
console.log(path.resolve(__dirname, '..', './modules', './app.js')); // получаем абсолютный путь до файла, 
// вторым аргументом можно передать путь до файла, относительно которого мы хотим получить путь до файла, который мы указываем в третьем аргументе
console.log(path.join(__dirname, '..', './modules', './app.js')); // получаем абсолютный путь до файла, но путём конкатенации строк