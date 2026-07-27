/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that models an Y axis.
 */

import {Axis} from './axis.js';

/**
 * Class that models how to print the Y Axis.
 */
export class YAxis extends Axis {
  /**
   * Defines how to display the labels of the Y axis.
   * @param context Tools used to display the axis.
   * @param canvas Canvas where the axis will be displayed.
   */
  protected printLabels(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const step = this.separation * this.scale;

    context.font = '10px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    const maxAxisLength = Math.abs(this.endPoint.getYCoordinate() - this.beginPoint.getYCoordinate());

    for (let y = 0, value = 0; Math.abs(y) <= maxAxisLength + 2; y -= step, value += this.separation) {
      context.moveTo(0, y);
      context.lineTo(-5, y);
      context.fillText(value.toFixed(2).toString(), -8, y);
    }
    context.stroke();
  }
}