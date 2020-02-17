'use strict';

(function () {
  // Импорт функций из других модулей
  var wizard = window.wizard;
  var createSimilarWizards = window.similarWizards.createWizards;
  var debounce = window.debounce;
  var load = window.backend.load;
  var errorLoadHandler = window.util.errorHandler;

  // Находим необходимые элементы DOM

  // Окно настроек
  var setup = document.querySelector('.setup');

  // Массив данных магов
  var wizardDataArray = [];

  // Определяем функции посредством которых updateWizards будет вызван с задержкой
  // Для каждого параметра-цвета своя функция задержки
  var updateWizardsOnCoatChange = debounce(updateWizards);
  var updateWizardsOnEyesChange = debounce(updateWizards);

  /**
   * Определяем ранг "похожести" магов с настраиваемым магом
   * Сопадение по плащу приоритетней совпадения по глазам
   * Чем больше совпадений, тем выше ранг
   * @param {Object} similarWizard - объект данных мага
   * @return {Number} ранг
   */
  function getRank(similarWizard) {
    var rank = 0;

    if (similarWizard.colorCoat === wizard.coatColor) {
      rank += 2;
    }
    if (similarWizard.colorEyes === wizard.eyesColor) {
      rank += 1;
    }

    return rank;
  }

  /**
   * Компаратор сравнения по имени
   * Необходим для устойчивости сортировки
   * @param {Object} left - объект данных мага
   * @param {Object} right - объект данных мага
   * @return {Number} результат сравнения
   */
  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Общий компаратор сравнения магов
   * Необходим для сортировки магов по "похожести"
   * @param {Object} left - объект данных мага
   * @param {Object} right - объект данных мага
   * @return {Number} результат сравнения
   */
  function comparator(left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  }

  /**
   * Отрисовка похожих магов
   */
  function updateWizards() {
    // Удаляем похожих персонажей, если они есть
    var similarList = setup.querySelector('.setup-similar-list');
    similarList.querySelectorAll('.setup-similar-item').forEach(function (item) {
      item.remove();
    });
    // Создаем фрагмент с магами и добавляем его в список похожих персонажей
    var similarWizards = createSimilarWizards(wizardDataArray.sort(comparator));
    similarList.appendChild(similarWizards);
    // Отображаем список похожих персонажей
    setup.querySelector('.setup-similar').classList.remove('hidden');
  }

  /**
   * Обработчик изменения цвета плаща
   * @param {String} color - цвет
   */
  function coatChangeHandler(color) {
    wizard.coatColor = color;
    updateWizardsOnCoatChange();
  }

  /**
   * Обработчик изменения цвета глаз
   * @param {String} color - цвет
   */
  function eyesChangeHandler(color) {
    wizard.eyesColor = color;
    updateWizardsOnEyesChange();
  }

  /**
   * Обработчик события успешной загрузки данных с сервера
   * @param {Array} data - массив объктов данных магов
   */
  function successLoadHandler(data) {
    // Запоминаем полученные данные
    wizardDataArray = data;
    updateWizards();
  }

  // Перезаписываем (абстрактные) обработчики-пустышки, объявленные в wizard.js
  wizard.coatChangeHandler = coatChangeHandler;
  wizard.eyesChangeHandler = eyesChangeHandler;

  // Получаем массив данных магов
  load(successLoadHandler, errorLoadHandler);
})();
