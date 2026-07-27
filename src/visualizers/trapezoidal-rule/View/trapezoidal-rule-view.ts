/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @description Trapezoidal Rule Calculator application view.
 */

import {Point} from '../Model/point';
import {TrapezoidalRuleData} from '../Model/trapezoidal-rule-data';
import {FunctionDisplay} from './function-display';
import {InputHandler} from './input-handler';
import {ResultDisplay} from './result-display';

export class TrapezoidalRuleView {
  /** Class that contains button and receives input events. */
  private readonly inputHandler: InputHandler;
  /** Class that displays a function into a canvas. */
  private readonly functionDisplay: FunctionDisplay;
  /** Class that displays the sum of all trapezium areas */
  private readonly resultDisplay: ResultDisplay;

  /**
   * Creates a new instance of the view of the Trapezoidal Rule Calculator
   */
  constructor() {
    const mainContainer = document.getElementById('main-container') as HTMLDivElement;

    mainContainer.style.height = ''; 
    mainContainer.classList.add('mt-5');

    const topRowColumns = document.createElement('div') as HTMLDivElement;
    topRowColumns.classList.add('columns', 'is-vcentered');
    mainContainer.append(topRowColumns);

    const canvasColumn = document.createElement('div') as HTMLDivElement;
    canvasColumn.classList.add('column', 'is-8');
    canvasColumn.style.aspectRatio = '2 / 1';
    topRowColumns.append(canvasColumn); 
    
    const cartesianPlaneConfiguration = {
      minimumXValue: 0,
      maximumXValue: 2,
      minimumYValue: 0,
      maximumYValue: 5,
      scaleXAxis: 0.2,
      scaleYAxis: 0.5
    };
    this.functionDisplay = new FunctionDisplay(canvasColumn, cartesianPlaneConfiguration);

    const actionsColumn = document.createElement('div') as HTMLDivElement;
    actionsColumn.classList.add('column', 'is-4');
    topRowColumns.append(actionsColumn); 
    this.inputHandler = new InputHandler(actionsColumn);

    const resultDiv = document.createElement('div') as HTMLDivElement;
    resultDiv.classList.add('has-text-centered');
    mainContainer.append(resultDiv);
    this.resultDisplay = new ResultDisplay(resultDiv);
  }

  /**
   * Adds a listener to the Update Funcion event.
   * @param callback New listener.
   */
  addUpdateFunctionListener(callback: (data: TrapezoidalRuleData) => void): void {
    this.inputHandler.addUpdateFunctionListener(callback);
  }

  /**
   * Displays the function in the canvas.
   * @param functionPoints Points thet contain the evaluated values and its result.
   */
  displayFunction(functionPoints: Point[]): void {
    this.functionDisplay.displayFunction(functionPoints);
  }

  /**
   * Displays the vertices of the trapezoids used in the application
   * @param vertices Vertices of the trapezoids used to calculate the integral.
   */
  displayTrapezoids(trapezoidVertices: Point[]): void {
    this.functionDisplay.displayTrapezoidVertices(trapezoidVertices);
    this.functionDisplay.displayTrapezoids(trapezoidVertices);
  }

  /**
   * Displays the function in the canvas.
   */
  displayEmptyPlane(): void {
    this.functionDisplay.displayEmptyPlane();
  }

  /**
   * Updates the cartesian planes to display the given range.
   * @param newStartingValue New starting X axis value.
   * @param newEndingValue New ending X axis value.
   */
  updatePlaneLimits(newStartingValue: number, newEndingValue: number, trapezoidVertices: Point[]): void {
    this.functionDisplay.updateXLimits(newStartingValue, newEndingValue);
    this.functionDisplay.updateYLimitsUsingTrapezoidVertices(trapezoidVertices);
  }

  /**
   * Updates the result of the sum of trapeziums displayed in the application.
   * @param newResult New result of the sum of trapeziums.
   */
  updateSumOfTrapezoids(newResult: number): void {
    this.resultDisplay.updateSumOfAreas(newResult);
  }
}