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

// Индексы соответствующих массивов
// Используются для переключения цветов в цикле
// COAT_COLORS
var coatColorIdx = 0;
// EYES_COLORS
var eyesColorIdx = 0;
// FIREBALL_COLORS
var fireballColorIdx = 0;

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

// Клик по мантии мага меняет ее цвет
setupWizardCoat.addEventListener('click', function () {
  // Получаем следующий элемент массива. Если текущий элемент последний, то возвращается нулевой
  var value = COAT_COLORS[++coatColorIdx % COAT_COLORS.length];
  setupWizardCoat.style.fill = value;
  // Меняем значение соответствующего скрытого тега input
  setupPlayer.querySelector('.coat-color').value = value;
});

// Клик по глазу мага меняет цвет глаз
setupWizardEyes.addEventListener('click', function () {
  // Получаем следующий элемент массива. Если текущий элемент последний, то возвращается нулевой
  var value = EYES_COLORS[++eyesColorIdx % EYES_COLORS.length];
  setupWizardEyes.style.fill = value;
  // Меняем значение соответствующего скрытого тега input
  setupPlayer.querySelector('.eyes-color').value = value;
});

// Клик по файерболу меняет его цвет
setupFireball.addEventListener('click', function () {
  // Получаем следующий элемент массива. Если текущий элемент последний, то возвращается нулевой
  var value = FIREBALL_COLORS[++fireballColorIdx % FIREBALL_COLORS.length];
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
