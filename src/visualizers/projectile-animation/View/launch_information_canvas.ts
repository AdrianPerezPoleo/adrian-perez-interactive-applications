/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that knows how to display a projectile animation.
 */

import {Projectile} from '../Model/projectile.js';

/**
 * Data introduced by the user in the differents input fields.
 */
export interface ProjectileInformation {
  initialHeight: number;
  initialSpeed: number;
  initialAngle: number;
}

/**
 * Class that displays a projectile animation.
 */
export class LaunchInformationCanvas {
  /** Time that has passed since the projectile was launched */
  private timePassed: number = 0.0;

  /** Distance that the projectile has travelled from the beginning point. */
  private travelledDistance: number = 0.0;

  /** Maximum height the projectile has reached. */
  private maxHeight: number = 0.0;

  private projectile: Projectile = new Projectile();

  constructor(private readonly canvas: HTMLCanvasElement,
              private readonly context: CanvasRenderingContext2D) { }

  /**
   * Modifies the stored information in the information canvas.
   * @param timePassed Time that has passed since the last update.
   * @param travelledDistance Distance that has been travelled since the last update.
   * @param currentHeight Height of the projectile in the current moment.
   * @param projectile Projectile that has been launched.
   */
  updateInformation(timePassed: number, travelledDistance: number, currentHeight: number, projectile: Projectile): void {
    if (this.projectile !== projectile) {
      this.projectile = projectile;
      this.maxHeight = 0.0;
      this.timePassed = 0.0;
      this.travelledDistance = 0.0;
    }

    this.maxHeight = (currentHeight > this.maxHeight) ? currentHeight : this.maxHeight;
    this.timePassed = timePassed;
    this.travelledDistance = travelledDistance;
  }

  /**
   * Prints on the canvas the relevant metrics of the last launch: maximum height, time passed and travelled distance.
   */
  displayInformation(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.fillStyle = 'black';
    this.context.font = 'bold 15px "Helvetica Neue", Helvetica, Arial, sans-serif';
    this.context.textAlign = 'center';

    this.context.fillText('LAST LAUNCH METRICS', this.canvas.width / 2 - 60, 30);
    this.context.font = '15px "Helvetica Neue", Helvetica, Arial, sans-serif';
    this.context.fillText(`Maximum Height: ${this.maxHeight.toFixed(2)} m`, this.canvas.width / 2 - 60, 60);
    this.context.fillText(`Time Passed: ${this.timePassed.toFixed(2)} s`, this.canvas.width / 2 - 60, 90);
    this.context.fillText(`Travelled Distance: ${this.travelledDistance.toFixed(2)} m`, this.canvas.width / 2 - 60, 120);

    this.context.restore();
  }
}