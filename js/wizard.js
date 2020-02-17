'use strict';

(function () {
  // Импорт функций и констант из других модулей
  var COAT_COLORS = window.constants.COAT_COLORS;
  var EYES_COLORS = window.constants.EYES_COLORS;
  var FIREBALL_COLORS = window.constants.FIREBALL_COLORS;

  // Необходимые элементы DOM

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

  var wizard = {
    // Предполагаем, что нулевые элементы массивов цветов совпадают с
    // соответствующими цветами установленными посредством CSS стилей
    coatColor: COAT_COLORS[coatColorIdx],
    eyesColor: EYES_COLORS[eyesColorIdx],
    coatChangeHandler: function () { },
    eyesChangeHandler: function () { }
  };

  // Определяем обработчики событий

  // Клик по мантии мага меняет ее цвет
  setupWizardCoat.addEventListener('click', function () {
    // Получаем следующий элемент массива. Если текущий элемент последний, то возвращается нулевой
    var value = COAT_COLORS[++coatColorIdx % COAT_COLORS.length];
    setupWizardCoat.style.fill = value;
    wizard.coatChangeHandler(value);
    // Меняем значение соответствующего скрытого тега input
    setupPlayer.querySelector('.coat-color').value = value;
  });

  // Клик по глазу мага меняет цвет глаз
  setupWizardEyes.addEventListener('click', function () {
    // Получаем следующий элемент массива. Если текущий элемент последний, то возвращается нулевой
    var value = EYES_COLORS[++eyesColorIdx % EYES_COLORS.length];
    setupWizardEyes.style.fill = value;
    wizard.eyesChangeHandler(value);
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

  // Экспорт объекта мага
  window.wizard = wizard;
})();
