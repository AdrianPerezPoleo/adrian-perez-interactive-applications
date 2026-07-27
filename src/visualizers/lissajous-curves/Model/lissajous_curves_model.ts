/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 18, 2026
 * @description Model class that stores the Lissajous curve that is being displayed.
 */

import { LissajousCurve } from './lissajous_curve.js';
import { Point } from './point.js';

export class LissajousCurvesModel {
  /** Curve that is shown in the main program. */
  private readonly curve: LissajousCurve;

  constructor(xAxisAmplitude: number = 100, yAxisAmplitude: number = 100, firstAngularFrequency: number = 7,
              secondAngularFrequency: number = 6, phase = 0) { 
    this.curve = new LissajousCurve(xAxisAmplitude, yAxisAmplitude, firstAngularFrequency, 
                                    secondAngularFrequency, phase);
  }

  /**
   * Returns the points of the curve that is stored in the model.
   * @return Points of the printed curve.
   */
  getCurvePoints(totalPoints: number): Point[] {
    return this.curve.getCurvePoints(totalPoints);
  }

  /**
   * Modifies the amplitude of the curve in the X axis.
   * @param newAmplitude Amplitude of the curve in the X axis.
   */
  setXAxisAmplitude(newAmplitude: number): void {
    this.curve.setXAxisAmplitude(newAmplitude);
  }

  /**
   * Modifies the amplitude of the curve in the Y axis.
   * @param newAmplitude Amplitude of the curve in the Y axis.
   */
  setYAxisAmplitude(newAmplitude: number): void {
    this.curve.setYAxisAmplitude(newAmplitude);
  }

  /**
   * Modifies the angular frequency of one of the movements.
   * @param newFrequency New angular frequency used to calculate the curve.
   */
  setFirstAngularFrequency(newFrequency: number): void {
    this.curve.setFirstAngularFrequency(newFrequency);
  }

  /**
   * Modifies the angular frequency of the second movement.
   * @param newFrequency New angular frequency used to calculate the curve.
   */
  setSecondAngularFrequency(newFrequency: number): void {
    this.curve.setSecondAngularFrequency(newFrequency);
  }

  /**
   * Modifies the phase of the movements.
   * @param newPhase New phase used in the calculations.
   */
  setPhase(newPhase: number): void {
    this.curve.setPhase(newPhase);
  }
  
}