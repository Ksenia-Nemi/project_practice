# Создание веб-сервера на Node.js с нуля

## Оглавление
- [Введение](#введение)
- [Подготовка](#подготовка)
- [Первый сервер](#первый-сервер)
- [Базовый сервер](#базовый-сервер)
- [Заключение](#заключение)


## Введение
В этом руководстве мы создадим простой статический веб-сервер на **Node.js**, который сможет обслуживать **HTML**, **CSS**, **JavaScript** файлы и изображения. Сервер будет автоматически определять MIME-типы файлов и корректно обрабатывать ошибки.

## Подготовка
Для создания простого статического веб-сервера на **Node.js** нам понадобится установить [**Visual Studio Code**](https://code.visualstudio.com/download) и [**Node.js**](https://nodejs.org/en/download). После установки создайте на компьютере папку `practic`, а в ней файл `server.js`. Откройте папку `practic` в *Visual Studio Code* и перейдите в файл `server.js`.

## Первый сервер
Давайте создадим свой первый сервер. В файле `server.js` напишите:
```
const http = require('http');
http.createServer().listen(3000);
```
Теперь, чтобы запустить сервер откройте терминал **Visual Studio Code** и напишите:
`node server.js`
Наш сервер создан и запущен, открыть его можно по ссылке [`http://localhost:3000`](http://localhost:3000), но перейдя по ней, вы увидите ошибку. Это происходит по тому, что сервер не знает, как обрабатывать запросы. Чтобы исправить это нужно добавить входящий запрос(`req`) и исходящий ответ(`res`). Давайте исправим код:
```
const http = require('http');
http.createServer((req, res) => res.end()).listen(3000);
```
Теперь переходя по ссылке [`http://localhost:3000`](http://localhost:3000) у вас открывается пустая страница. Так и должно быть, ведь мы ещё не сделали ночинку. Давайте это исправим:
```
const http = require('http');
http.createServer((req, res) => {
  // Устанавливаем правильные заголовки
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('Привет, я твой первый веб-сервер на Node.js!');}).listen(3000);
```
Перейдя по ссылке [`http://localhost:3000`](http://localhost:3000), вы увидите, что теперь на нашей белой странице появилась надпись "*Привет, я твой первый веб-сервер на Node.js!*". Ну и перед тем, как завершить наш первый сервер, давайте сделаем так, чтобы при запуске в консоль выводилась ссылка, перейдя по которой, открывался наш сайт. Вот изменения:
```
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('Привет, я твой первый веб-сервер на Node.js!');
}).listen(3000, () => console.log('Открой в браузере: http://localhost:3000'));
```
Когда вы звпустите сервер в консоли появится сообщение "*Открой в браузере: http://localhost:3000*" в котором будет ссылка по которой можно будет перейти.

## Базовый сервер

Для базового веб-сервера нужно воссоздать у себя проект `my-site` со следующей схемой:
```bash
my-site/
├── server.js          # Сервер Node.js
├── index.html         # Главная страница
├── page2.html         # Вторая страница
├── css/
│   └── style.css      # Стили
└── js/
    └── script.js      # JavaScript
```
Наполнение `index.html`:
```
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная страница</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Добро пожаловать!</h1>
        <nav>
            <a href="index.html" class="active">Главная</a>
            <a href="page2.html">Страница 2</a>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>О нас</h2>
            <p>Это главная страница нашего простого сайта.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 Простой сайт</p>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
```
Наполнение `page2.html`:
```
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вторая страница</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Вторая страница</h1>
        <nav>
            <a href="index.html">Главная</a>
            <a href="page2.html" class="active">Страница 2</a>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Контент второй страницы</h2>
            <p>Здесь находится содержимое второй страницы.</p>
            <button id="alertBtn">Показать сообщение</button>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 Простой сайт</p>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
```
Наполнение `style.css`:
```
/* Общие стили */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background: #35424a;
    color: white;
    padding: 1rem 0;
    text-align: center;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
}

nav a.active {
    background: #e8491d;
    border-radius: 5px;
}

main {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

footer {
    text-align: center;
    padding: 1rem;
    background: #35424a;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
}

button {
    background: #35424a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background: #e8491d;
}
```
Наполнение `script.js`:
```
// Функция для главной страницы
if (document.getElementById('changeColorBtn')) {
    const changeColorBtn = document.getElementById('changeColorBtn');
    let colors = ['#f4f4f4', '#e6f7ff', '#ffe6e6', '#e6ffe6'];
    let currentColor = 0;
    
    changeColorBtn.addEventListener('click', function() {
        document.body.style.backgroundColor = colors[currentColor];
        currentColor = (currentColor + 1) % colors.length;
    });
}

// Функция для второй страницы
if (document.getElementById('alertBtn')) {
    const alertBtn = document.getElementById('alertBtn');
    
    alertBtn.addEventListener('click', function() {
        alert('Привет со второй страницы!');
    });
}
```
После воссоздания проекта открываем его в **Visual Studio Code** и переходим в папку `server.js`. Она сейчас пустая, давайте напишим в ней код для запуска простого сервера:
```
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
});
```
Пока что наш веб-сервер не работает с другими файлами, а просто выводит "*Hello, World!*". Чтобы это исправить, давайте добавим обработку статических файлов(**HTML**, **CSS**, **JS**) и проверку на то, существует ли файл:
```
const http = require('http');
const PORT = 3000;

const fs = require('fs');
const path = require('path');
const url = require('url');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

  // Проверка существования файла
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404 Not Found</h1>');
    }

    // Определение MIME-типа
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    // Чтение и отправка файла
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        return res.end('Server Error');
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
});
```
Теперь наш сервер работает со статическими файлами проекта `my-site`. Давайте добавим возможность при запуске сервера открывать интересующую нас страницу сайта. Внесём следующие изменения:
```
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
  console.log('Доступные страницы:');
  console.log(`- Главная: http://localhost:${PORT}/`);
  console.log(`- Страница 2: http://localhost:${PORT}/page2.html`);
});
```
Когда вы запустите сервер повторно в консоли появится список с доступными страницами и ссылками на них. Теперь мы можем открывать наш сайт не только с главной страницы, но и со второй. Осталось сделать завершение работы нашего сайта более прозрачным и выводить сообщение в консоль:
```
// Обработка завершения
process.on('SIGINT', () => {
  console.log('\nСервер останавливается...');
  server.close(() => {
    console.log('Сервер успешно остановлен.');
    process.exit(0);  // явно указываем код выхода 0 (успех)
  });

  // Принудительное завершение, если сервер не остановился за 5 секунд
  setTimeout(() => {
    console.error('Принудительное завершение...');
    process.exit(1);
  }, 5000);
});
```
Наш базовый сервер готов. Итоговый код:
```
const http = require('http');
const PORT = 3000;

const fs = require('fs');
const path = require('path');
const url = require('url');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404 Not Found</h1>');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        return res.end('Server Error');
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
  console.log('Доступные страницы:');
  console.log(`- Главная: http://localhost:${PORT}/`);
  console.log(`- Страница 2: http://localhost:${PORT}/page2.html`);
});

// Обработка завершения
process.on('SIGINT', () => {
  console.log('\nСервер останавливается...');
  server.close(() => {
    console.log('Сервер успешно остановлен.');
    process.exit(0);  // явно указываем код выхода 0 (успех)
  });

  // Принудительное завершение, если сервер не остановился за 5 секунд
  setTimeout(() => {
    console.error('Принудительное завершение...');
    process.exit(1);
  }, 5000);
});
```

## Заключение

В этом руководстве мы рассмотрели создание простого и базового HTTP-сервера на Node.js, а также научились обработке различных маршрутов и работе со статическими файлами.