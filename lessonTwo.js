const yargs = require('yargs'); // подключаем модуль yargs
const {addNote, printNotes, removeNote, editNotes} = require('./notes.controller'); // подключаем контроллер с функциями для работы с заметками

const packageVersion = require('./package.json'); // получаем версию из package.json

yargs.version(packageVersion.version); // устанавливаем версию для приложения

yargs.command({ // создаёт новую команду
    command: 'add', // название команды
    describe: 'Add new note to a list', // описание команды
    builder: { // объект с опциями команды
        title: { // название опции
            type: 'string', // тип опции
            describe: 'Note title', // описание опции
            demandOption: true, // обязательна ли опция
        },
    },
    handler({title}) { // title работает как аргумент функции, мы можем его получить потому что в builder мы указали title
        addNote(title); // вызываем функцию из контроллера
    }
})
// для вызова команды нам нужно в консоли написать node index.js add --title="My title"

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
       printNotes();
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'Note id',
            demandOption: true,
        },
    },
    async handler({id}) {
        removeNote(id);
    }
})

yargs.command({
    command: 'edit',
    describe: 'Edit note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'Note id',
            demandOption: true,
        },
        title: {
            type: 'string',
            describe: 'New note title',
            demandOption: true,
        },
    },
    async handler({id, title}) {
        editNotes(id, title);
    }
})


yargs.parse(); // запускает парсинг аргументов командной строки, без него ничего не будет работать