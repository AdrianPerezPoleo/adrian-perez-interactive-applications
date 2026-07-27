/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that models an axis.
 */

import {Point} from './point.js';

/**
 * Abstract class that models an axis.
 */
export abstract class Axis {
  /**
   * Creates a new instance of an Axis object.
   * @param beginPoint First point where the axis will be displayed.
   * @param endPoint Last point to draw the axis. 
   * @param separation Separation between the marks of each value in the axis.
   * @param scale Scale of the points in the axis.
   */
  constructor(
    protected readonly beginPoint: Point,
    protected readonly endPoint: Point,
    protected readonly separation: number,
    protected readonly scale: number
  ) {}

  /**
   * Draws an axis in a given canvas.
   * @param canvas Canvas where the axis will be displayed. It uses the Template Method.
   */
  draw(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d')!;
    context.save();
    
    this.printLine(context);
    this.printLabels(context, canvas);
    this.printArrows(context);
    
    context.restore();
  }

  /**
   * Template that implements how to draw the line of the axis.
   * @param context Context that will be used to display the axis.
   */
  protected printLine(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.moveTo(this.beginPoint.getXCoordinate(), this.beginPoint.getYCoordinate());
    context.lineTo(this.endPoint.getXCoordinate(), this.endPoint.getYCoordinate());
    context.stroke();
  }

  /**
   * Method that defines how to draw the arrows. If it's not implemented,
   * the arrows won't be displayed.
   * @param context Context that will be used to draw the arrows.
   */
  protected printArrows(context: CanvasRenderingContext2D): void { }

  /**
   * Method that defined how to print the labels of an axis.
   * @param context Context that will be used to display the axis.
   * @param canvas Canvas where the acis will be displayed.
   */
  protected abstract printLabels(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
}