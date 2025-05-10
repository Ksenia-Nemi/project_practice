Отчет по проектной практике: «Виртуальный стилист для школьников»

1. Введение

В рамках данной проектной практики была разработана веб-система «Виртуальный стилист для школьников», позволяющая пользователям загружать изображение своего образа и получать рекомендации по стилю одежды и аксессуаров на основе анализа фото. Цель отчета — подробно описать процесс исследования, выбора технологий и практическую часть реализации проекта в формате Markdown, чтобы любой начинающий мог воспроизвести все шаги и понять принцип работы системы.

2. Исследование предметной области

Перед началом разработки важно было изучить следующие аспекты:

Существующие решения и тренды в сегменте виртуальных стилистов

Онлайн-сервисы персонального шопинга (например, Stitch Fix, Thread).

Мобильные приложения с рекомендациями на основе ML (Trendyol Style AI, Fashwell).

Потребности целевой аудитории

Простота использования: минимум шагов от загрузки фото до получения рекомендаций.

Наглядность: отображение примеров одежды сразу на изображении пользователя.

Возможность выбора образцов из доступных каталогов.

Выбор технологического стека:

Frontend: React для динамического интерфейса и удобной работы с компонентами.

Backend: Python Flask — легковесный и популярный фреймворк.

ML-библиотеки: TensorFlow (или TensorFlow.js) для обучения и интеграции модели рекомендаций.

Хранение данных: PostgreSQL для информации о товарах и рекомендациях.

Определение функциональных и нефункциональных требований:

Загрузка и предварительная обработка изображений.

Вызов REST API для анализа и получения данных.

Высокая отзывчивость интерфейса (<200 мс на запрос).

3. Последовательность действий по исследованию и созданию технологии

Сбор и анализ требований: интервью с потенциальными пользователями, изучение аналогов.

Проектирование архитектуры: выбор клиент-серверной модели, протокол JSON/REST.

Подготовка набора данных: сбор фото и аннотаций для обучения модели (public датасеты, расширение с помощью аугментаций).

Разработка прототипа модели:

Настройка среды Python, установка TensorFlow.

Создание и тренировка базовой нейронной сети.

Реализация бэкенд-сервера:

Flask-приложение с маршрутами /upload и /recommend.

Обработка изображений и вызов модели.

Разработка фронтенда:

Создание React-приложения, компонентов загрузки и отображения.

Интеграция с API через Axios.

Тестирование системы: юнит-тесты для API, интеграционные тесты для проверки end-to-end.

Докеризация и развертывание: написание Dockerfile, настройка CI/CD.

4. Техническое руководство по созданию технологии

4.1. Установка и настройка окружения

Установка Node.js и npm
# На Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

Установка Python 3.10+ и virtualenv

sudo apt-get install python3.10 python3-venv
python3 -m venv venv
source venv/bin/activate

Клонирование репозитория

git clone https://github.com/Ksenia-Nemi/project_practice.git
cd project_practice

4.2. Инициализация клиентской части (React)

cd client
npx create-react-app .
npm install axios react-router-dom

Структура проекта client/:

client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UploadForm.js
│   │   └── Recommendations.js
│   ├── App.js
│   └── index.js
└── package.json

Пример компонента загрузки фото

// src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ onResult }) {
const [file, setFile] = useState(null);

const handleSubmit = async e => {
e.preventDefault();
const formData = new FormData();
formData.append('image', file);
const response = await axios.post('/api/upload', formData, {
headers: {'Content-Type': 'multipart/form-data'}
});
onResult(response.data);
};

return (
<form onSubmit={handleSubmit}>
<input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
<button type="submit">Загрузить</button>
</form>
);
}

4.3. Инициализация серверной части (Flask)

cd ../server
pip install flask flask-cors tensorflow pillow psycopg2-binary

Структура проекта server/:

server/
├── app.py
├── model.py
├── requirements.txt
└── Dockerfile

Основной файл сервера

# server/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_style

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_image():
img = request.files['image']
result = predict_style(img)
return jsonify(result)

if __name__ == '__main__':
app.run(host='0.0.0.0', port=5000)

Функция предсказания

# server/model.py
import tensorflow as tf
from PIL import Image
import numpy as np

def load_model():
return tf.keras.models.load_model('style_model.h5')

model = load_model()

def predict_style(image_file):
image = Image.open(image_file).resize((224, 224))
arr = np.array(image) / 255.0
arr = arr[np.newaxis, ...]
preds = model.predict(arr)[0]
styles = ['Casual', 'Business', 'Sport', 'Evening']
top = np.argsort(preds)[::-1][:3]
return {styles[i]: float(preds[i]) for i in top}

4.4. Докеризация и развертывание

Dockerfile для сервера

FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]

Docker Compose

version: '3'
services:
server:
build: ./server
ports:
- "5000:5000"
client:
build: ./client
ports:
- "3000:3000"

5. Иллюстрации

Архитектурная схема приложения


flowchart LR
User[Пользователь] -->|Загружает фото| Client[React-приложение]
Client -->|POST /api/upload| Server[Flask-сервер]
Server -->|predict_style| ML[ML-модель]
ML -->|Результат| Server
Server -->|JSON| Client
Client -->|Отображает| User

Структура проекта

classDiagram
class Client {
+UploadForm()
+Recommendations()
}
class Server {
+upload_image()
+predict_style()
}
Client --> Server

Последовательность действий при загрузке изображения

sequenceDiagram
participant U as Пользователь
participant C as Клиент
participant S as Сервер
participant M as Модель

U->>C: Загружает изображение
C->>S: Отправляет POST /api/upload
S->>M: Вызывает predict_style()
M-->>S: Возвращает рекомендации
S-->>C: Возвращает JSON
C-->>U: Отображает результаты

Прототип пользовательского интерфейса


6. Заключение

В отчете детально рассмотрены этапы исследования, выбора технологий и практической реализации проекта «Виртуальный стилист для школьников». Представленные пошаговые инструкции и примеры кода помогут любому начинающему разработчику воспроизвести и расширить данную систему под свои нужды.