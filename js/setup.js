'use strict';

// Количество похожих персонажей
var WIZARDS_COUNT = 4;

// Набор первых имен
var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

// Набор вторых имен
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

// Цвета одежды
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

// Цвета глаз
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

// Цвета огненных шаров
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];


/**
 * Возвращает случайное целое число от 0 (включительно) до верхней границы (не включительно),
 * т.е промежуток [0, upperLimit)
 * @param {Number} upperLimit - верхняя граница
 * @return {Number} случайное целое число
 */
function getRandomInt(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

/**
 * Возвращает случайный элемент массива
 * @param {Array} arr - массив
 * @return {Object} элемент массива
 */
function getRandomValue(arr) {
  return arr[getRandomInt(arr.length)];
}

/**
 * Формирование полного имени из случайных первого и второго имени
 * @return {String} полное имя
 */
function getName() {
  return getRandomValue(FIRST_NAMES) + ' ' + getRandomValue(LAST_NAMES);
}

/**
 * Конвертация числа из десятичной системы счисления в шестнадцатиричную
 * @param {String} num - строка содержащая число в пределах [0, 255]
 * @return {String} строка содержащая число в пределах [0, ff]
 */
function convertNumToHEX(num) {
  return ('0' + parseInt(num, 10).toString(16)).slice(-2);
}

/**
 * Конвертация цвета из RGB в HEX
 * Если строка не распознается как RGB, возвращается пустая строка
 * (с) взято  из свободных источников
 * @param {String} rgb - строка содержащая цвет в формате RGB
 * @return {String} строка содержащая число в формате HEX
 */
function convertRGBtoHEX(rgb) {
  rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ?
    '#' + convertNumToHEX(rgb[1]) + convertNumToHEX(rgb[2]) + convertNumToHEX(rgb[3]) : '';
}

/**
 * Определяется элемент массива следующий за входящим элементом.
 * Если такого элемента нет, то возвращается нулевой элемент массива.
 * @param {Object} currentValue - некоторое значение (элемент массива)
 * @param {Array} arr - массив, из которого нужно взять следующий элемент
 * @return {Object} следующий элемент массива
 */
function getNextValue(currentValue, arr) {
  var idx = arr.indexOf(currentValue ? currentValue : arr[0]);
  return (idx === -1 || idx === arr.length - 1) ? arr[0] : arr[idx + 1];
}

/**
 * Создание списка объектов данных магов
 * @return {Array} список данных
 */
function createWizards() {
  var wizardArray = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizardArray.push({
      name: getName(),
      coatColor: getRandomValue(COAT_COLORS),
      eyesColor: getRandomValue(EYES_COLORS)
    });
  }
  return wizardArray;
}

/**
 * Создание объекта мага на основе переданного шаблона и данных
 * @param {Object} wizard - объект данных мага
 * @param {HTMLElement} template - шаблон мага
 * @return {HTMLElement} объект мага
 */
function createWizard(wizard, template) {
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

/**
 * Функция создает объекты магов и формирует из них фрагмент документа
 * Маги создаются на основе шаблона similar-wizard-template
 * Свойства магов инициализируются из переданного массива данных
 * @param {Array} wizardArray - массив данных магов
 * @return {DocumentFragment} фрагмент документа
 */
function createDataFragment(wizardArray) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardArray.length; i++) {
    fragment.appendChild(createWizard(wizardArray[i], similarWizardTemplate));
  }
  return fragment;
}

// Находим необходимые элементы DOM

// "Кнопка" открытия окна настроек
var setupOpen = document.querySelector('.setup-open');
// Аватар игрока
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');

// Окно настроек
var setup = document.querySelector('.setup');
// Иконка (кнопка) закрытия окна настроек
var setupClose = setup.querySelector('.setup-close');
// Поле ввода имени мага
var setupUserName = setup.querySelector('.setup-user-name');

// Блок настройки внешнего вида мага
var setupPlayer = setup.querySelector('.setup-player');
var setupWizard = setupPlayer.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');

// Определяем обработчики событий

// Открытие окна настроек по клику на аватар игрока
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});

// Открытие окна настроек по нажатию клавиши Enter, если аватар игрока в фокусе
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setup.classList.remove('hidden');
  }
});

// Не закрывать окно настроек, если фокус находится в поле ввода имени мага
setupUserName.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

// Закрываем окно настроек по нажатию на клавишу Escape, в случае, если окно открыто
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' && !setup.classList.contains('hidden')) {
    setup.classList.add('hidden');
  }
});

// Закрываем окно настроек по клику на кнопке закрытия окна
setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});

// Закрываем окно настроек по нажатию Enter, если фокус находится на кнопке закрытия окна
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setup.classList.add('hidden');
  }
});

// Клик по мантии мага меняет ее цвет. Цвет меняется циклически
setupWizardCoat.addEventListener('click', function () {
  var value = getNextValue(setupWizardCoat.style.fill, COAT_COLORS);
  setupWizardCoat.style.fill = value;
  // Меняем значение соответствующего скрытого тега input
  setupPlayer.querySelector('.coat-color').value = value;
});

// Клик по глазу мага меняет цвет глаз. Цвет меняется циклически
setupWizardEyes.addEventListener('click', function () {
  var value = getNextValue(setupWizardEyes.style.fill, EYES_COLORS);
  setupWizardEyes.style.fill = value;
  // Меняем значение соответствующего скрытого тега input
  setupPlayer.querySelector('.eyes-color').value = value;
});

// Клик по файерболу меняет его цвет. Цвет меняется циклически
setupFireball.addEventListener('click', function () {
  // Настройки цвета даны в HEX, а браузер возвращает значение background-color в RGB
  // Производим конвертацию
  var value = convertRGBtoHEX(setupFireball.style.backgroundColor);
  value = getNextValue(value, FIREBALL_COLORS);
  setupFireball.style.backgroundColor = value;
  // Меняем значение соответствующего скрытого тега input
  setupPlayer.querySelector('.fireball-color').value = value;
});

// Создаем массив данных магов
var wizards = createWizards();

// Создаем фрагмент с магами и добавляем его в список похожих персонажей
setup.querySelector('.setup-similar-list').appendChild(createDataFragment(wizards));
// Отображаем список похожих персонажей
setup.querySelector('.setup-similar').classList.remove('hidden');
