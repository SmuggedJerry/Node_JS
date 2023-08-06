const fs = require('fs/promises') // подключаем модуль для работы с файловой системой
const path = require('path'); // подключаем модуль для работы с путями
const fsSync = require('fs'); // подключаем модуль для работы с файловой системой синхронно

const base = path.join(__dirname, 'temp');

const getContent = () => `
\r${process.argv[2] ?? ""}
`

async function start() {
    try {
      if (fsSync.existsSync(base)) { // проверяем, существует ли папка, приставка Sync означает, что функция работает синхронно и может блокировать выполнение кода
        await fs.appendFile(path.join(base, 'logs.txt'), getContent()); // записываем данные в файл, если они есть, если нет, то записываем пустую строку
        const data = await fs.readFile(path.join(base, 'logs.txt'), {encoding: 'utf-8'}); // читаем файл
        console.log('document created');
        console.log(data);
      } else {
        await fs.mkdir(base);
        await fs.writeFile(path.join(base, 'logs.txt'), process.argv[2] ?? ""); 
    }
    } catch (error) {
      console.log('error', error)   
    }
}

start()