/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Mar 28, 2023
 * @description Class that models a point.
 */

/**
 * Class that models a point and how to display it.
 */
export class Point {
  constructor(private readonly xCoordinate: number = 0,
              private readonly yCoordinate: number = 0) { }

  /**
   * Returns the X coordinate of the point.
   */
  getXCoordinate(): number {
    return this.xCoordinate;
  }

  /**
   *  Returns the Y coordinate of the point.
   */
  getYCoordinate(): number {
    return this.yCoordinate;
  }

  /**
   * Displays a point on a canvas.
   * @param canvas Canvas where the point will be displayed.
   */
  draw(canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.save();

    context.fillStyle = 'black';
    context.arc(this.xCoordinate, this.yCoordinate, 4, 0, 2 * Math.PI);
    context.fill();

    context.restore();
  }
}