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

// Создаем массив данных магов
var wizards = createWizards();

// Отображаем настройки игры
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
// Создаем фрагмент с магами и добавляем его в список похожих персонажей
userDialog.querySelector('.setup-similar-list').appendChild(createDataFragment(wizards));
// Отображаем список похожих персонажей
userDialog.querySelector('.setup-similar').classList.remove('hidden');