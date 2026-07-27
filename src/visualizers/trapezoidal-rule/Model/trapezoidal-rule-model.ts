/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Trapezoidal Rule Calculator application model.
 */

import {MathFunction} from './math_function';
import {Point} from './point';

export class TrapezoidalRuleModel {
  /** Function to be evaluated. */
  private readonly mathFunction: MathFunction;
  /** First value to be evaluated. */
  private startingXValue: number;
  /** Last X value to be evaluated. */
  private endingXValue: number;
  /** Number of trapezoids used to calculate the area. */
  private numberOfTrapezoids: number;

  /**
   * Creates a new model.
   */
  constructor() {
    this.mathFunction = new MathFunction('x^2 + 1');
    this.startingXValue = 0;
    this.endingXValue = 2;
    this.numberOfTrapezoids = 4;
  }

  /**
   * Returns the points we obtain when evaluating the function in a given range.
   * @param startValue First value we will evaluate the function with.
   * @param endValue Last value we will evaluate the function with.
   * @return Points result of the evaluation of the function in the given range.
   */
  calculateFunctionPoints(): Point[] {
    const functionPoints: Point[] = [];
    const step = (this.endingXValue - this.startingXValue) / 1000;
    for (let i = this.startingXValue; i <= this.endingXValue + 1e-5; i += step) {
      const yCoordinate = this.mathFunction.evaluate(i);
      functionPoints.push({xCoordinate: i,yCoordinate: yCoordinate});
    }
    return functionPoints;
  }

  /**
   * Returns a vector containing the trapezoids vertices.
   * @return Trapezoid vertices.
   */
  getTrapezoidsVertices(): Point[] {
    const trapezoidVertices: Point[] = [];
    const step = (this.endingXValue - this.startingXValue) / this.numberOfTrapezoids;
    for (let i = this.startingXValue; i <= this.endingXValue + 1e-5; i += step) {
      const yCoordinate = this.mathFunction.evaluate(i);
      trapezoidVertices.push({xCoordinate: i, yCoordinate: yCoordinate});
    }
    return trapezoidVertices;    
  }

  /**
   * Updates the function being evaluated.
   * @param newExpression New function to evaluate.
   */
  updateFunction(newExpression: string): void {
    this.mathFunction.updateExpression(newExpression);
  }

  /**
   * Updates the limits of the evaluation of the function.
   * @param newStartingValue New starting X value to evaluate.
   * @param newEndingValue New last value to evaluate.
   */
  updateLimits(newStartingValue: number, newEndingValue: number): void {
    this.startingXValue = newStartingValue;
    this.endingXValue = newEndingValue;
  }

  /**
   * Updates the number of trapezoids in the calculation.
   * @param newNumberOfTrapezoids New number of trapezoids to be used.
   */
  updateNumberOfTrapezoids(newNumberOfTrapezoids: number): void {
    if (newNumberOfTrapezoids <= 0 || 
        Number.isNaN(newNumberOfTrapezoids ||
        newNumberOfTrapezoids % 1 !== 0)) {
      return;
    }
    this.numberOfTrapezoids = newNumberOfTrapezoids;
  }

  /**
   * Returns the result of the sum of aras ot the trapeziums.
   * @return Result of the sum of areas of the trapeziums.
   */
  getSumOfTrapezoidAreas(): number {
    const trapeziumVertices: Point[] = this.getTrapezoidsVertices();
    let sumOfAreas = 0;
    for (let i = 0; i < trapeziumVertices.length - 1;++i) {
      const trapeziumWidth = trapeziumVertices[i + 1].xCoordinate - trapeziumVertices[i].xCoordinate;
      const leftTrapeziumHeight = trapeziumVertices[i].yCoordinate;
      const rightTrapzeiumHeight = trapeziumVertices[i + 1].yCoordinate;
      const trapeziumArea = 0.5 * (leftTrapeziumHeight + rightTrapzeiumHeight) * trapeziumWidth;
      console.log(`Trapezium ${i + 1}: 0.5 * (${leftTrapeziumHeight} + ${rightTrapzeiumHeight}) * ${trapeziumWidth} = ${trapeziumArea.toFixed(3)}`);
      sumOfAreas += trapeziumArea;
    }
    return sumOfAreas;
  }
}