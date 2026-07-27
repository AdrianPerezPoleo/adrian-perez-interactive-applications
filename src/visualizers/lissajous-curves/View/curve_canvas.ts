/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 18, 2026
 * @description Program that draws the curve into a canvas.
 */

import { Point } from '../Model/point.js';

/**
 * Class that implements how the curve must be displayed on the screen.
 */
export class CurveCanvas {
  /** Canvas used to display the curve. */
  private readonly canvas: HTMLCanvasElement;
  /** Tools used to draw the curve. */
  private readonly context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;

    const divElement: HTMLDivElement = document.getElementById('div-canvas') as HTMLDivElement;
    divElement.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d')!;
    this.resize();
  }

  /**
   * Removes curve tat is being displayed.
   */
  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'whitesmoke';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Displays the Lissajous curve in the canvas.
   * @param curvePoints Points of the curve to be displayed.
   */
  drawCurve(curvePoints: Point[]): void {
    this.context.save();

    this.context.strokeStyle = 'black';
    this.context.imageSmoothingEnabled = true;
    this.context.lineWidth = 1.5;
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';

    this.context.beginPath();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

    const firstPoint = curvePoints[0];
    this.context.moveTo(firstPoint.xCoordinate, -firstPoint.yCoordinate);
    
    for (const point of curvePoints) {
      this.context.lineTo(point.xCoordinate, -point.yCoordinate);
    }

    this.context.stroke();
    this.context.restore()
  }

  /**
   * Changes the size of the view when the windows is resized.
   */
  resize(): void {
    const container = document.getElementById('div-canvas');
    if (!container) return;

    const containerWidth = container.clientWidth;
    const availableHeight = window.innerHeight;

    this.canvas.width = containerWidth - 40;
    this.canvas.height = 0.78 * availableHeight;
  }
}