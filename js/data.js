'use strict';

(function () {
  // Импорт констант из других модулей
  var WIZARDS_COUNT = window.constants.WIZARDS_COUNT;
  var FIRST_NAMES = window.constants.FIRST_NAMES;
  var LAST_NAMES = window.constants.LAST_NAMES;
  var COAT_COLORS = window.constants.COAT_COLORS;
  var EYES_COLORS = window.constants.EYES_COLORS;

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
   * Создание списка тестовых объектов данных магов
   * @return {Array} список данных
   */
  function createWizards() {
    var wizardArray = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizardArray.push({
        name: getName(),
        colorCoat: getRandomValue(COAT_COLORS),
        colorEyes: getRandomValue(EYES_COLORS)
      });
    }
    return wizardArray;
  }

  // Экспорт функций модуля
  window.data = {
    createWizards: createWizards,
  };
})();
