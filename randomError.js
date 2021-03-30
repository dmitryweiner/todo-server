const funnyMessages = [
    { title: 'Кошка бросила котят, это Путин виноват' },
    { title: 'Тревога! Волк украл зайчат' },
    { title: 'Абсолютно неизвестная ошибка' },
    { title: 'Операция провалена успешно' },
    { title: 'Сервер пьян' },
    { title: 'Сервер ушёл', code: 410 },
    { title: 'Unavailable For Legal Reasons', code: 451 },
    { title: 'I\'m a Teapot', code: 418 }
];


function getRandomError(res) {
    if (Math.random() > 0.5) {
        const index = Math.floor(Math.random() * funnyMessages.length);
        const error = new Error(funnyMessages[index].title);
        error.status = funnyMessages[index].code;
        throw error;
    }
}

function shouldDropConnection(){
    return Math.random() > 0.9;
}

module.exports = {
    getRandomError,
    shouldDropConnection
};