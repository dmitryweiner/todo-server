# Учебный сервер, который временами генерирует ошибки
* С вероятностью 50% сервер возвращает случайную ошибку.
* С вероятностью 10% сервер рвёт соединение.

## Технологии
* [Express.js](https://expressjs.com/)
* [LowDB.js](https://github.com/typicode/lowdb)
* [Nanoid](https://github.com/ai/nanoid)

## Установка
```shell
npm i
npm start
```

## API
### GET /todos
```json
[
  {
    "id": "dfh2vml5el6br7g8",
    "title": "Покормить цветы",
    "isChecked": true
  },
  {
    "id": "pq3mv5n6soy7h8",
    "title": "Полить кота",
    "isChecked": false
  }
]
```
### POST /todos
```json
{
  "title": "Вырастить картошку"
}
```

### PUT /todos/:id
```json
{
  "isChecked": true
}
```