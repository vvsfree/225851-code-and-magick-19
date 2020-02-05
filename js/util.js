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

  // Внешний интерфейс
  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
