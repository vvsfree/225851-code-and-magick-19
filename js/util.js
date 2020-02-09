'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  /**
   * Функция action будет выполнена, если событие является нажатием на клавишу Escape
   * @param {Event} evt - событие
   * @param {Object} action - функция
   */
  function isEscEvent(evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  }

  /**
   * Функция action будет выполнена, если событие является нажатием на клавишу Enter
   * @param {Event} evt - событие
   * @param {Object} action - функция
   */
  function isEnterEvent(evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  }

  /**
   * Обработчик сообщения об ошибке
   * Рисует блок с сообщением на главном экране
   * Используется в модулях setup.js и dialog.js
   * @param {String} errorMessage - сообщение об ошибке
   */
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  // Внешний интерфейс
  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    errorHandler: errorHandler
  };
})();
