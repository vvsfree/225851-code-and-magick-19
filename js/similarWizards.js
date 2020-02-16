'use strict';

(function () {
  // Импорт функций и констант из других модулей
  var WIZARDS_COUNT = window.constants.WIZARDS_COUNT;

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
    var loopLimit = wizardArray.length < WIZARDS_COUNT ? wizardArray.length : WIZARDS_COUNT;
    for (var i = 0; i < loopLimit; i++) {
      fragment.appendChild(createWizard(wizardArray[i], similarWizardTemplate));
    }
    return fragment;
  }

  window.similarWizards = {
    createWizards: createWizards
  };
})();
