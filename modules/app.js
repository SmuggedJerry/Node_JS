import path from 'path';
import { Playground } from './playground.js';
import { fileURLToPath } from 'url';

console.log(Playground.NUM);

// console.log(__dirname); // путь до текущей директории
// console.log(__filename); // путь до текущего файла

// сейчас если мы вызовем данные консоль логи, то мы получим ошибку, т.к. мы не можем использовать __dirname и __filename в модулях
// ранее модули работали как функция, которая принимала в себя __dirname и __filename, но сейчас это не так
// т.е. 
// function (exports, require, module, __filename, __dirname) {
//    внутри наш код, допусти как мы писали в index.js
// }

// чтобы использовать __dirname и __filename нам нужно импортировать fileURLToPath из модуля url

const __filename = fileURLToPath(import.meta.url); // получаем путь до текущего файла
const __dirname = path.dirname(__filename); // получаем путь до текущей директории

console.log(__dirname); // путь до текущей директории
console.log(__filename); // путь до текущего файла