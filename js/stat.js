'use strict';

(function () {
  // Местоположение и размеры окна статистики
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;

  // Используется для отрисовки тени окна статистики
  var GAP = 10;

  // Шрифт
  var FONT = '16px "PT Mono"';
  var FONT_GAP = 20;

  // Высота гистограммы
  var CHART_HEIGTH = 150;
  // Ширина панели гистограммы
  var BAR_WIDTH = 40;
  // Промежуток между панелями
  var BAR_GAP = 50;

  // Используемые цвета
  var BLACK_COLOR = '#000';
  var WHITE_COLOR = '#fff';
  var RED_COLOR = 'rgba(255, 0, 0, 1)';
  var BLUE_COLOR = 'hsl(240, 100%, 50%)';
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  // Имя текущего игрока в списке игроков
  var MY_NAME = 'Вы';

  /**
   * Инициализация свойств контекста
   * @param {CanvasRenderingContext2D} ctx - контекст canvas
   */
  function init(ctx) {
    ctx.font = FONT;
    ctx.textBaseline = 'top';
  }

  /**
   * Отрисовка окна статистики
   * Также используется для отрисовки тени окна
   * @param {CanvasRenderingContext2D} ctx - контекст canvas
   * @param {Number} x - коорината по горизонтали
   * @param {Number} y - координата по вертикали
   * @param {String} color - цвет заливки прямоугольника
   */
  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  /**
   * Отрисовка заголовка
   * @param {CanvasRenderingContext2D} ctx - контекст canvas
   * @param {*} color - цвет шрифта
   */
  function renderHeader(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + 2 * FONT_GAP);
  }

  /**
   * Определение максимального элемента в массиве
   * @param {Array} arr - массив результатов прохождения игры
   * @return {Number} максимальное время прохождения игры
   */
  function getMaxElement(arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  }

  /**
   * Определение цвета панели гистограммы
   * @param {String} player - имя игрока
   * @return {String} цвет в формате HSL
   */
  function getColor(player) {
    // Цвет панели для текущего игрока - красный.
    // Цвет для других игроков определяется как синий со случайным значением насыщенности.
    return player === MY_NAME ? RED_COLOR : BLUE_COLOR.replace('100%', Math.floor(Math.random() * 101) + '%');
  }

  /**
   * Отрисовка гистограммы
   * @param {CanvasRenderingContext2D} ctx - контекст canvas
   * @param {Array} players - список игроков
   * @param {Array} times - список миллисекунд - результаты прохождения игры
   */
  function renderChart(ctx, players, times) {
    // Определяем местоположение прямоугольника гистограммы и его ширину
    var chartWidth = players.length * BAR_WIDTH + (players.length - 1) * BAR_GAP;
    var chartXPos = CLOUD_X + (CLOUD_WIDTH - chartWidth) / 2;
    var chartYPos = CLOUD_Y + 4 * FONT_GAP;

    // Определяем максимальное время прохождения игры
    var maxTime = getMaxElement(times);

    // Определяем начальное положение первой панели гистограммы
    var barXPos = chartXPos;
    var barYPos = chartYPos + FONT_GAP;

    // Определяем положение нижней подписи к панелям гистограммы
    var playerNameYPos = chartYPos + CHART_HEIGTH - FONT_GAP;

    // Определяем максимально возможную высоту панели гистогарммы
    var barMaxHeight = CHART_HEIGTH - 2 * FONT_GAP;

    // Отрисовка всех панелей с подписями
    for (var i = 0; i < players.length; i++) {
      // Высота текущей панели
      var barHeight = Math.round(times[i] * barMaxHeight / maxTime);
      // Вычисляем позицию панели по вертикали
      // Также используется для определения позиции верхней подписи (время прохождения игры)
      var yPos = barYPos + (barMaxHeight - barHeight);

      // Отрисовка панели и подписей к ней
      ctx.fillStyle = getColor(players[i]);
      ctx.fillRect(barXPos, yPos, BAR_WIDTH, barHeight);
      ctx.fillStyle = BLACK_COLOR;
      // Верхняя подпись - время прохождения игры
      ctx.fillText(Math.round(times[i]), barXPos, yPos - FONT_GAP);
      // Нижняя подпись - имя игрока
      ctx.fillText(players[i], barXPos, playerNameYPos);

      // Вычисление координаты по горизонтали следующей панели
      barXPos += BAR_WIDTH + BAR_GAP;
    }
  }

  /**
   * Главная функция отрисовки статистики
   * @param {CanvasRenderingContext2D} ctx - контекст canvas
   * @param {Array} players - список игроков
   * @param {Array} times - список миллисекунд - результаты прохождения игры
   */
  function renderStatistics(ctx, players, times) {
    init(ctx);

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);
    renderHeader(ctx, BLACK_COLOR);
    renderChart(ctx, players, times);
  }

  // Экспорт модуля
  window.stat = {
    renderStatistics: renderStatistics
  };
})();
