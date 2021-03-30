const funnyMessages = [
    'Кошка бросила котят, это Путин виноват',
    'Тревога! Волк украл зайчат',
    'Абсолютно неизвестная ошибка',
    'Операция провалена успешно'
];


function getRandomError() {
    if (Math.random() > 0.5) {
        const index = Math.floor(Math.random() * funnyMessages.length);
        const error = new Error(funnyMessages[index]);
        error.code = 500;
        throw error;
    }
}

module.exports = {
    getRandomError
};