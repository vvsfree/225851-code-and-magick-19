'use strict';

(function () {
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
