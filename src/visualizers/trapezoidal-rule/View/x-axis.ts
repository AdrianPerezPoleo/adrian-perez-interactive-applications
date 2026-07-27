/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Class that models an X axis.
 */

import {Axis} from './axis';

/**
 * Class that displays an X axis.
 */
export class XAxis extends Axis {
  /**
   * Draws the horizontal line of the x axis.
   * @param context Tools needed to display the line in a canvas.
   */
  protected override drawLine(context: CanvasRenderingContext2D): void {
    context.save();
    const y = this.origin.yCoordinate;
    context.strokeStyle = 'darkgray';
    context.lineWidth = 1;
    
    const startingXCoordinate = this.origin.xCoordinate + (this.minimumValue * this.pixelsPerUnit);
    const endingXCoordinate = this.origin.xCoordinate + (this.maximumValue * this.pixelsPerUnit);

    context.beginPath();
    context.moveTo(startingXCoordinate, y);
    context.lineTo(endingXCoordinate, y);
    context.stroke();

    context.restore();
  }

  /**
   * Display the values of the x axis.
   * @param context Tools needed to display the values in the canvas.
   */
  protected override printLabels(context: CanvasRenderingContext2D): void {
    const labelYCoordinate = this.origin.yCoordinate;
    context.save();

    context.font = '18px Arial';
    context.fillStyle = 'black'; 
    context.textAlign = 'center';
    context.textBaseline = 'top';

    const startingValue = Math.ceil(this.minimumValue / this.scale) * this.scale;

    context.beginPath();
    for (let value = startingValue; value <= this.maximumValue; value += this.scale) {
      const labelXCoordinate = this.origin.xCoordinate + (value * this.pixelsPerUnit);
      if (Math.abs(value) > 0.001) {
        const label = Number(value.toFixed(2)).toString();
        context.fillText(label, labelXCoordinate, labelYCoordinate + 10);
      } else {
        context.fillText('0', labelXCoordinate, labelYCoordinate + 10);
      }
    }
    
    context.restore();
  }
}