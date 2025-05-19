const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.md': 'text/markdown'
};

// Функция для получения списка HTML-страниц
function getAvailablePages() {
  const files = fs.readdirSync(__dirname);
  return files
    .filter(file => file.endsWith('.html'))
    .map(file => file.replace('.html', ''));
}

const availablePages = getAvailablePages();

const server = http.createServer((req, res) => {
  let filePath = decodeURI(req.url.split('?')[0]);
  
  if (filePath.endsWith('/')) {
    filePath += 'index.html';
  }
  
  if (filePath === '/') {
    filePath = '/index.html';
  }

  // Проверяем запросы без расширения
  if (!path.extname(filePath)) {
    const potentialPage = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    if (availablePages.includes(potentialPage)) {
      filePath = `/${potentialPage}.html`;
    }
  }

  const fullPath = path.join(__dirname, filePath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      return send404(res);
    }
    sendFile(fullPath, res);
  });
});

function sendFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Ошибка сервера');
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>404 - Страница не найдена</h1>');
}

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
  console.log('\nДоступные страницы:');
  
  // Выводим все доступные страницы с нумерацией
  availablePages.forEach((page, index) => {
    console.log(`${index + 1}. http://localhost:${PORT}/${page}`);
  });
  
  console.log('\nКоманды:');
  console.log('Ctrl+C - остановить сервер');
  console.log('Откройте любую ссылку в браузере');
});

process.on('SIGINT', () => {
  console.log('\nОстановка сервера...');
  server.close(() => {
    console.log('Сервер успешно остановлен');
    process.exit();
  });
  
  setTimeout(() => {
    console.log('Принудительная остановка');
    process.exit(1);
  }, 3000);
});