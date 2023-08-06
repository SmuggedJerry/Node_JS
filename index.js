const chalk = require('chalk');
const {addNote, getNotes, removeNote, editNotes} = require('./notes.controller');
const express = require('express');
const path = require('path');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'pages');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => { // создаем маршрут для главной страницы
    res.render('index', { // рендерим страницу index.ejs
        title: 'Express App', // передаем в нее параметр title со значением Express App
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res) => { // создаем маршрут для главной страницы
    await addNote(req.body.title); // рендерим страницу index.ejs
    res.render('index', { // передаем в нее параметр title со значением Express App
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
        res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.put('/:id/edit', async (req, res) => { // создаем маршрут для редактирования заметки
    const { id } = req.params; // получаем id заметки из адреса
    const newTitle = req.body.title; // получаем новое название заметки из тела запроса
    await editNotes(id, newTitle); // вызываем функцию для редактирования заметки
    res.render('index', { // рендерим страницу index.ejs
      title: 'Express App', 
      notes: await getNotes(), 
      created: false,
      edited: false,
    });
  });

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})


