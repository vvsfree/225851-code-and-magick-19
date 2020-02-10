'use strict';

(function () {
  // Импорт функций и констант из других модулей
  var WIZARDS_COUNT = window.constants.WIZARDS_COUNT;
  var COAT_COLORS = window.constants.COAT_COLORS;
  var EYES_COLORS = window.constants.EYES_COLORS;
  var FIREBALL_COLORS = window.constants.FIREBALL_COLORS;
  var load = window.backend.load;
  var errorHandler = window.util.errorHandler;

  /**
   * Создание объекта мага на основе переданного шаблона и данных
   * @param {Object} wizard - объект данных мага
   * @param {HTMLElement} template - шаблон мага
   * @return {HTMLElement} объект мага
   */
  function createWizard(wizard, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }

  /**
   * Функция создает объекты магов и формирует из них фрагмент документа
   * Маги создаются на основе шаблона similar-wizard-template
   * Свойства магов инициализируются из переданного массива данных
   * @param {Array} wizardArray - массив данных магов
   * @return {DocumentFragment} фрагмент документа
   */
  function createWizards(wizardArray) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createWizard(wizardArray[i], similarWizardTemplate));
    }
    return fragment;
  }

  /**
   * Обработчик события успешной загрузки данных с сервера
   * @param {Array} wizards - массив объктов данных магов
  */
  function successHandler(wizards) {
    // Создаем фрагмент с магами и добавляем его в список похожих персонажей
    setup.querySelector('.setup-similar-list').appendChild(createWizards(wizards));
    // Отображаем список похожих персонажей
    setup.querySelector('.setup-similar').classList.remove('hidden');
  }

  // Находим необходимые элементы DOM

  // Окно настроек
  var setup = document.querySelector('.setup');

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

  // Получаем массив данных магов
  load(successHandler, errorHandler);
})();
