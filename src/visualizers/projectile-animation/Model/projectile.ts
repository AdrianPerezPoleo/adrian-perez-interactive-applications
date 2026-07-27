/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Mar 28, 2023
 * @description Class that models a point.
 * @see{@link https://en.wikipedia.org/wiki/Projectile_motion}
 */

import {Point} from '../View/point.js';

/**
 * Class that models a point and how to display it.
 */
export class Projectile {
  /** Time the projectile has been flying. */
  private currentTime: number;

  /** True if the projectile is already on the ground. False otherwise. */
  private hasLanded = false;

  /** Creates a new instance of a Projectile. */
  constructor(private readonly initialHeight: number = 0,
              private readonly initialSpeed: number = 0,
              private readonly initialAngle: number = 0,
              private readonly gravity: number = 9.81) { 
    this.initialAngle = this.initialAngle * Math.PI / 180;
    this.currentTime = 0.0;
  }

  /**
   * Returns the value of the attribute initialAngle.
   * @return Initial angle of the projectile when it is launched.
   */
  getAngle(): number {
    return this.initialAngle;
  }

  /**
   * Returns the value of the attribute initialHeight.
   * @return Initial height of the projectile when it is launched.
   */
  getHeight(): number {
    return this.initialHeight;
  }

  /**
   * Returns the value of the attribute currentTime.
   * @return Time that indicates the position of the projectile.
   */
  getCurrentTime(): number {
    return this.currentTime;
  }

  /**
   * Returns if the projectile is already on the ground or if it's still flying.
   * @return True if the projectile has landed. False otherwise.
   */
  getHasLanded(): boolean {
    return this.hasLanded;
  }

  /**
   * Returns the position of the projectile in the current time it has stored. 
   */
  getCurrentPosition(): Point {
    return this.getPositionAtTime(this.currentTime);
  }

  /**
   * Returns the position of the projectile in a given moment of time.
   * @param time Time when we will evaluate the position of the projectile.
   */
  getPositionAtTime(time: number): Point {
    const newXCoordinate = this.initialSpeed * time * Math.cos(this.initialAngle);
    const newYCoordinate = this.initialHeight + this.initialSpeed * time * Math.sin(this.initialAngle) - 0.5 * this.gravity * time ** 2;

    return new Point(newXCoordinate, newYCoordinate);    
  }

  /**
   * Returns the height of the projectile in the given X position.
   * @param xPosition X position where the y will be calculated.
   * @return Height of the projectile in the given X position. 
   */
  getYPositionAt(xPosition: number): Point {
    const firstFactor: number = Math.tan(this.initialAngle) * xPosition;
    const secondFactor: number = this.gravity * xPosition ** 2 / (2 * this.initialSpeed **2 * Math.cos(this.initialAngle)**2);
    return new Point(xPosition, this.initialHeight + firstFactor - secondFactor);
  }

  /**
   * Returns where the projectile will land.
   * @return X coordinate of the projectile landing.
   */
  getRange(): number {
    const firstFactor = (this.initialSpeed * Math.cos(this.initialAngle) / this.gravity);
    const squareRoot =  Math.sqrt((this.initialSpeed * Math.sin(this.initialAngle)) ** 2 + 2 * this.gravity * this.initialHeight);
    return firstFactor * (this.initialSpeed * Math.sin(this.initialAngle) + squareRoot);  
  }

  /**
   * Returns the maximum height the projectile will reach.
   * @return Maximum height the projectile will reach.
   */
  getMaxHeight(): number {
    return this.initialHeight + (this.initialSpeed ** 2 * Math.sin(this.initialAngle) ** 2) / (2 * this.gravity); 
  }

  /**
   * Returns the exact total flight time of the projectile.
   * @return Total time in seconds until it hits the ground.
   */
  getTotalFlightTime(): number {
    const firstFactor = this.initialSpeed * Math.sin(this.initialAngle);
    const squareRoot = Math.sqrt(firstFactor ** 2 + 2 * this.gravity * this.initialHeight);
    return (firstFactor + squareRoot) / this.gravity;
  }

  /**
   * Advances the time that has passed.
   * @param deltaTime Amount of time to sum to the current time.
   */
  update(deltaTime: number): void {
    if (this.hasLanded) return;

    const maxTime = this.getTotalFlightTime();
    this.currentTime += deltaTime;

    if (this.currentTime >= maxTime) {
      this.currentTime = maxTime;
      this.hasLanded = true;
    }
  }
}