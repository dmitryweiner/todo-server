const ERROR_PROBABILITY = 0.3;
const CONNECTION_DROP_PROBABILITY = 0.05;
const MAX_RESPONSE_DELAY = 2000;

const funnyMessages = [
    { title: 'Кошка бросила котят, это Путин виноват' },
    { title: 'Тревога! Волк украл зайчат' },
    { title: 'Абсолютно неизвестная ошибка' },
    { title: 'Операция провалена успешно' },
    { title: 'Сервер пьян' },
    { title: 'Сисадмин пьян' },
    { title: 'Все ушли на базу' },
    { title: 'К сожалению, сервер проигнорировал ваш запрос. Оставайтесь на линии!' },
    { title: 'Слишком много запросов', code: 429 },
    { title: 'Вас много, а я одна', code: 429 },
    { title: 'Сервер ушёл', code: 410 },
    { title: 'Unavailable For Legal Reasons', code: 451 },
    { title: 'I\'m a Teapot', code: 418 }
];


function getRandomError(res) {
    if (Math.random() < ERROR_PROBABILITY) {
        const index = Math.floor(Math.random() * funnyMessages.length);
        const error = new Error(funnyMessages[index].title);
        error.status = funnyMessages[index].code;
        return error;
    }
}

function shouldDropConnection(){
    return Math.random() < CONNECTION_DROP_PROBABILITY;
}

function unpredictableDelay(callback) {
    setTimeout(callback, Math.random() * MAX_RESPONSE_DELAY);
}

module.exports = {
    getRandomError,
    shouldDropConnection,
    unpredictableDelay
};
