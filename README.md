# Проект: Место

## Главные пункты
1. Описание
2. Используемые технологии
3. Возможности улучшения
4. Ссылка на GitHub

*Описание*

Пятая проектная работа все так же посвящена JavaScript. Прямое продолжение четвертой проектной работы, только сейчас уже задействованы все функциональные
кнопки лэндинга. Данная работа уже может удовлетворить пользователя в персонализации данных. Можно добавлять свои места и отмечать любимые.

Функционал обновлен в ходе шестой проектной работы. Добавлена защита от добавления пустой карточки, валидация формы и более дружелюбные пользователю
обработчики событий клавиатуры и мыши.

Функционал лендинга после седьмой проектной работы не изменился. Был осуществлен лишь рефакторинг кода.
Функционал после восьмой проектной работы не изменился.

*Используемые технологии*

Продолжается то, что началось на стадии четвертой проектной работы: работа JavaScript и создание интерактива. На этот раз добавлена возможность
создания своих карточек мест, нажатие "лайка" на карточке и ее удаление (также удаление уже существующих). Выбор нужной карточки обеспечен добавлением
ожидания события в каждую карточку и также вызов метода target из elvent. Так мы не потеряем нужную нам карточку и все события произойдут в нужно месте по
нужному клику.

В шестой проектнйо работе использовались новые обработчики событй, принимаемые от клавиатуры и кликов мыши. Больше всего внимания уделено возможностям валидации.
Валидация вынесена в отдельный .js файл. Со стороны языка огромная работа с функциями, пробрасывание переменных на различные уровни. Работа с объектом как с исходными данными.

Рефакторинг кода был осуществлен в сторону ООП. Созданы классы карточки и валидации для формы. Использовалась инкапсуляция. Многие функции собраны в самом классе карточки и не используются в общем файле index.js. Классы подключены в основной файл с помощью модулей.

После восьмой проектной работы был завершен рефакторинг по ООП парадигме. Между классами присутствуют сильные и слабые связи, используется привязка контекста. Реализована сборка проекта
с помощью инструмента Webpack.

*Возможности улучшения*

Доработка формы и полноценная отправка значений полей куда-то дальше, чем локальный код. Возможность менять картинку профиля. Пролистывание картинок карточек по скроллу
колесика мыши и добавление описания места, изображенного в большом открывщемся окне.

*Ссылка на GitHub/рабочую веерсию страницы*

[Кликать вот сюда](https://all1son4.github.io/mesto/)