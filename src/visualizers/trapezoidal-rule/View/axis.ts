/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Class that models an axis.
 */

import {Point} from '../Model/point';

/**
 * Abstract class that defines how axes should be implemented.
 */
export abstract class Axis {
  /**
   * Creates a new Axis object.
   * @param origin Point that defines the origin of the axes where the intersect.
   * @param minimumValue Lowest value in the axis. 
   * @param maximumValue Highest value in the axis. 
   * @param pixelsPerUnit Number of pixels a unit has in the axis.
   * @param scale Number of units between displayed units.
   */
  constructor(
    protected readonly origin: Point,
    protected readonly minimumValue: number,
    protected readonly maximumValue: number,
    protected readonly pixelsPerUnit: number,
    protected readonly scale: number) {}

  /**
   * Displays the axis in a canvas.
   * @param context Tools used to display the axis.
   * @param canvas Canvas where the xis will be displayed.
   */
  draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this.drawLine(context, canvas);
    this.printLabels(context);
  }

  /**
   * Draws the line that represents the axis.
   * @param context Tools needed to display the axis.
   * @param canvas Canvas where the axis will be displayed.
   */
  protected abstract drawLine(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;

  /**
   * Prints the values of the axis.
   * @param context Tools needed to draw the values.
   */
  protected abstract printLabels(context: CanvasRenderingContext2D): void;
}