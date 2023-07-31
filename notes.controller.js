const fs = require('fs/promises') // подключаем модуль для работы с файловой системой
const path = require('path'); // подключаем модуль для работы с путями
const chalk = require('chalk'); // подключаем модуль для работы с цветами в консоли

const notesPath = path.join(__dirname, 'db.json'); // получаем путь до файла с заметками

async function addNote(title) {
    // const notes = require('./db.json'); // получаем данные из файла с заметками
    // const notes = Buffer.from(buffer).toString('utf-8');
    const notes = await getNotes();

    // console.log(Array.isArray(notes)); // проверяем, что это массив, получим false, т.к. это строка
    // console.log(typeof JSON.parse(notes)); // проверяем, что это объект, получим object
    
    const note= {
        title,
        id: Date.now().toString()
    }

    notes.push(note); // добавляем заметку в массив

    await fs.writeFile(notesPath, JSON.stringify(notes)); // записываем массив в файл
    console.log(chalk.bgGreen('Note added!')); // выводим сообщение в консоль
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [] ;
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue('Here is the list of notes:'));
    notes.forEach(note => {
        console.log(chalk.cyan(note.id, note.title))
    })
}

async function removeNote (id) {
    const notes = await getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.bgYellow('Note removed!'));
}

module.exports = {
    addNote,
    printNotes,
    removeNote
}