/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that models an X axis.
 */

import {Axis} from './axis.js';

/**
 * Class that models how to print the X Axis.
 */
export class XAxis extends Axis {
  /**
   * Defines how to display the labels of the X axis.
   * @param context Tools used to display the axis.
   * @param canvas Canvas where the axis will be displayed.
   */
  protected override printLabels(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const centerX = canvas.width / 2;
    const centerY = this.beginPoint.getYCoordinate();
    const step = this.separation * this.scale;

    context.font = '10px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'top';

    const maxAxisLength = this.endPoint.getXCoordinate() - this.beginPoint.getXCoordinate();

    for (let x = 0, value = 0; x <= maxAxisLength + 2; x += step, value += this.separation) {
      context.moveTo(x, centerY);
      context.lineTo(x, centerY + 3);
      if (value !== 0) {
        context.fillText(value.toPrecision(3), x, centerY + 5);
      }
    }
    context.stroke();
  }
}