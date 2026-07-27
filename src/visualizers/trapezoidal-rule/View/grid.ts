/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Class that models a grid.
 */

import {Point} from '../Model/point';
import {CartesianPlaneConfiguration} from './cartesian-plane-configuration';

/**
 * Class that models a grid.
 */
export class Grid {
  /**
   * Creates a new instance of a grid.
   * @param origin Origin point of the grid.
   * @param pixelsPerUnitX Number of pixels needed to represent a unit in the x axis.
   * @param pixelsPerUnitY Number of pixels needed to represent a unit in the y axis.
   * @param configuration Parameters used to configure the grid (minimum Y value, maximum Y value, etc.)
   */
  constructor(private readonly origin: Point,
    private readonly pixelsPerUnitX: number,
    private readonly pixelsPerUnitY: number,
    private readonly configuration: CartesianPlaneConfiguration) {}

  /**
   * Displays the grid in the canvas.
   * @param context Tools needed to display the grid.
   */
  draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.beginPath();
    context.strokeStyle = 'gray';
    context.lineWidth = 1;

    const minimumYCoordinate = this.origin.yCoordinate - (this.configuration.maximumYValue * this.pixelsPerUnitY);
    const maximumYCoordinate = this.origin.yCoordinate - (this.configuration.minimumYValue * this.pixelsPerUnitY);
    const minimumXCoordinate = this.origin.xCoordinate + (this.configuration.minimumXValue * this.pixelsPerUnitX);
    const maximumXCoordinate = this.origin.xCoordinate + (this.configuration.maximumXValue * this.pixelsPerUnitX);

    const startingXValue = Math.ceil(this.configuration.minimumXValue / this.configuration.scaleXAxis) * this.configuration.scaleXAxis;
    for (let value = startingXValue; value <= this.configuration.maximumXValue; value += this.configuration.scaleXAxis) {
      const xCoordinate = this.origin.xCoordinate + (value * this.pixelsPerUnitX);
      context.moveTo(xCoordinate, minimumYCoordinate);
      context.lineTo(xCoordinate, maximumYCoordinate);
    }

    const startY = Math.ceil(this.configuration.minimumYValue / this.configuration.scaleYAxis) * this.configuration.scaleYAxis;
    for (let value = startY; value <= this.configuration.maximumYValue; value += this.configuration.scaleYAxis) {
      const yCoordinate = this.origin.yCoordinate - (value * this.pixelsPerUnitY);
      context.moveTo(minimumXCoordinate, yCoordinate);
      context.lineTo(maximumXCoordinate, yCoordinate);
    }

    context.stroke();
    context.restore();
  }
}