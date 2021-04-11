# Учебный сервер, который временами генерирует ошибки
> &laquo;
> Сервер с [синдромом Туретта](https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D0%BD%D0%B4%D1%80%D0%BE%D0%BC_%D0%A2%D1%83%D1%80%D0%B5%D1%82%D1%82%D0%B0).
> &raquo;
* С вероятностью 30% сервер возвращает случайную ошибку.
* С вероятностью 5% сервер рвёт соединение.
* Сервер отвечает с задержкой 0-2 с.

## Технологии
* [Express.js](https://expressjs.com/)
* [LowDB.js](https://github.com/typicode/lowdb)
* [Nanoid](https://github.com/ai/nanoid)

## Установка
```shell
npm i
```
## Запуск
Система аутентификации отключена (все роуты доступны):
```shell
npm start
```
Система аутентификации включена, ```/todos``` доступно только после аутентификации:
```shell
npm start -- useAuth
```

## Обращение к серверу
При отправке запросов с телом в формате ```JSON``` требуется отправлять заголовок ```Content-Type```:

```js
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'Кушоц'
    })
});
const data = await response.json();
```

## API entries

### Элементы списка дел ```/todos```

#### GET /todos
Получение списка всех элементов.
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

#### GET /todos/:id
Получение элемента по ID.
```json
{
  "id": "dfh2vml5el6br7g8",
  "title": "Покормить цветы",
  "isChecked": true
}
```

#### POST /todos
Создание нового элемента.
```json
{
  "title": "Вырастить картошку"
}
```

#### PUT /todos/:id
Модификация элемента.
```json
{
  "isChecked": true
}
```

#### DELETE /todos/:id
Удаление элемента.

### Аутентификация. ```/auth```

#### GET /auth
Проверка текущего состояния аутентификации.
* Залогинен:
```json
{
  "isAuth": true
}
```
* Незалогинен:
```json
{
  "isAuth": false
}
```

#### POST /auth
Логин в систему:
```json
{
  "username": "admin",
  "password": "123"
}
```
В учебных целях логин и пароль только такие.

Возвращает либо код ```200```, либо ```401```.

#### DELETE /auth
Выход из системы.
