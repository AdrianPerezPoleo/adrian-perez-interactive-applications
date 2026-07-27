/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 18, 2026
 * @description Class that models a Lissajous curve and all its parameters.
 */

import { Point } from './point.js';

/**
 * Class that models a Lissajous curve.
 */
export class LissajousCurve {
  constructor(private xAxisAmplitude: number,
              private yAxisAmplitude: number,
              private firstAngularFrequency: number,
              private secondAngularFrequency: number,
              private phase: number) { }
  /**
   * Modifies the amplitude of the curve in the X axis.
   * @param newAmplitude Amplitude of the curve in the X axis.
   */
  setXAxisAmplitude(newAmplitude: number): void {
    this.xAxisAmplitude = newAmplitude;
  }

  /**
   * Modifies the amplitude of the curve in the Y axis.
   * @param newAmplitude Amplitude of the curve in the Y axis.
   */
  setYAxisAmplitude(newAmplitude: number): void {
    this.yAxisAmplitude = newAmplitude;
  }

  /**
   * Modifies the angular frequency of one of the movements.
   * @param newFrequency New angular frequency used to calculate the curve.
   */
  setFirstAngularFrequency(newFrequency: number): void {
    this.firstAngularFrequency = newFrequency;
  }

  /**
   * Modifies the angular frequency of the second movement.
   * @param newFrequency New angular frequency used to calculate the curve.
   */
  setSecondAngularFrequency(newFrequency: number): void {
    this.secondAngularFrequency = newFrequency;
  }

  /**
   * Modifies the phase of the movements.
   * @param newPhase New phase used in the calculations.
   */
  setPhase(newPhase: number): void {
    this.phase = newPhase;
  }

  /**
   * Returns a big amount of the points that shapes the curve.
   * @return Vector containing the points of the curve. 
   */
  getCurvePoints(totalPoints: number): Point[] {
    const points: Point[] = [];
    for (let i = 0; i <= totalPoints; ++i) {
      const time = (i / totalPoints) * 2 * Math.PI; 
      points.push(this.getPositionAtTime(time));
    }
    return points;
  }

  /**
   * Returns the position of the curves in a given moment of time.
   * @param time Time that will be evaluated.
   */
  private getPositionAtTime(time: number): Point {
    const xCoordinate: number = this.xAxisAmplitude * Math.sin(this.firstAngularFrequency * time + this.phase);
    const yCoordinate: number = this.yAxisAmplitude * Math.sin(this.secondAngularFrequency * time);
    return {xCoordinate, yCoordinate};
  }
}