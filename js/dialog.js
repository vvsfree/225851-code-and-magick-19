'use strict';

(function () {
  // Импорт функций и констант из других модулей
  var save = window.backend.save;
  var errorHandler = window.util.errorHandler;

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

  // Элемент, за который будем диалог тащить (далее просто элемент)
  var dialogHandle = setup.querySelector('.upload');

  // Форма сохранения настроек
  var form = setup.querySelector('.setup-wizard-form');

  /**
   * Открываем диалог
   * Добавляем слушатель на нажатие keydown
   */
  function openDialog() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', dialogEscHandler);
  }

  /**
   * Закрываем диалог
   * Удаляем слушатель на нажатие keydown
   */
  function closeDialog() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', dialogEscHandler);
    // Если окно диалога перемещали, то возвращаем его в изначальное положение
    setup.removeAttribute('style');
  }

  /**
   * Обработчик нажатия клавиши Escape
   * Закрываем окно настроек
   * @param {Event} evt - событие keydown
   */
  function dialogEscHandler(evt) {
    window.util.isEscEvent(evt, closeDialog);
  }

  /**
   * Обработчик события успешной отправки данных
   */
  function successHandler() {
    closeDialog();
  }

  /**
   * Обработчик события submit на форме
   * @param {Event} evt - событие
   */
  function formSubmitHandler(evt) {
    save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  }

  // Открытие окна настроек по клику на аватар игрока
  setupOpen.addEventListener('click', function () {
    openDialog();
  });

  // Открытие окна настроек по нажатию клавиши Enter, если аватар игрока в фокусе
  setupOpenIcon.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openDialog);
  });

  // Не закрывать окно настроек, если фокус находится в поле ввода имени мага
  setupUserName.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });

  // Закрываем окно настроек по клику на кнопке закрытия окна
  setupClose.addEventListener('click', function () {
    closeDialog();
  });

  // Закрываем окно настроек по нажатию Enter, если фокус находится на кнопке закрытия окна
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeDialog);
  });

  // Добавляем обработчик события mousedown
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // Начальные координаты элемента
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    /**
     * Обработчик события mousemove: перемещение мыши
     * @param {Event} moveEvt - событие
     */
    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;
      // Дельта координат элемента
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // Новые координаты элемента
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // Перемещаем окно задавая его новые координаты
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    /**
     * Обработчик события mouseup: отпустили кнопку мыши
     * @param {Event} upEvt - событие
     */
    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (isDragged) {
        // Если мышку тащили, то необходимо устранить реакцию элемента file на click
        dialogHandle.addEventListener('click', function clickHandler(clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', clickHandler);
        });
      }

    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // Сохраняем настройки мага
  form.addEventListener('submit', formSubmitHandler);

})();
