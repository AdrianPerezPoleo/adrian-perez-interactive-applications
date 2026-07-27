/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Class that models an Y axis.
 */

import {Axis} from './axis';

/**
 * Class that displays an Y axis.
 */
export class YAxis extends Axis {
  /**
   * Draws the vertical line of the y axis.
   * @param context Tools needed to display the line in a canvas.
   */
  protected override drawLine(context: CanvasRenderingContext2D): void {
    context.save();
    const x = this.origin.xCoordinate;
    context.strokeStyle = 'darkgray';
    context.lineWidth = 1;

    const startingYCoordinate = this.origin.yCoordinate - (this.minimumValue * this.pixelsPerUnit);
    const endingYCoordinate = this.origin.yCoordinate - (this.maximumValue * this.pixelsPerUnit);

    context.beginPath();
    context.moveTo(x, startingYCoordinate);
    context.lineTo(x, endingYCoordinate);
    context.stroke();

    context.restore();
  }

  /**
   * Display the values of the y axis.
   * @param context Tools needed to display the values in the canvas.
   */
  protected override printLabels(context: CanvasRenderingContext2D): void {
    const labelXCoordinate = this.origin.xCoordinate;
    context.save();

    context.beginPath();
    context.font = '18px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    const startingValue = Math.ceil(this.minimumValue / this.scale) * this.scale;
    for (let value = startingValue; value <= this.maximumValue; value += this.scale) {
      const labelYCoordinate = this.origin.yCoordinate - (value * this.pixelsPerUnit);
      const label = Number(value.toFixed(2)).toString();
      context.fillText(label, labelXCoordinate - 10, labelYCoordinate);
    }
    
    context.restore();
  }
}