const os = require('os'); // подключаем модуль для работы с операционной системой

console.log(os.platform()); // ОС на которой запущено приложение
console.log(os.arch()); // архитектура процессора (x64, x32)
console.log(os.cpus()); // информация о процессорах
console.log(os.freemem()); // свободное место на диске в байтах 
console.log(os.totalmem()); // общее место на диске в байтах
console.log(os.uptime()/60/60); // в часах
console.log(os.homedir()); // домашняя директория