# ATK-test-bot
Телеграм-бот с возможностями:
- Вывод погоды в Канаде (OWMApi)
- Отправляет книгу по Python с описанием
- Делает рассылку всем пользователям бота

## Структура базы данных:
Таблица user:
Название | Тип данных | Первичный ключ | Null
--- | --- | --- | ---
tgId | character variyng | primary key | not null

## Переменные среды:
### PostgreSQL Settings
PGHOST=  
PGUSER=  
PGDATABASE=  
PGPASSWORD=  
PGPORT=

### telegram
TGTOKEN=

### OpenWeatherMap api
OWMKEY=

## Инструкция по развёртыванию:
1) Установить модули командой npm i
2) Настроить базу данных postgreSQL
3) Получить ключ к API http://openweathermap.org/
4) Получить токен бота телеграм
5) Указать значения переменных среды
6) Запустить командой npm start
