/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Trapezoidal Rule Calculator application controller.
 */

import {TrapezoidalRuleModel} from '../Model/trapezoidal-rule-model';
import {TrapezoidalRuleView} from '../View/trapezoidal-rule-view';
import {TrapezoidalRuleData} from '../Model/trapezoidal-rule-data';

/**
 * Class that models the controller of the Trapezoidal Rule Calculator.
 */
export class TrapezoidalRuleController {
  /**
   * Creates a new instance of the controller.
   * @param model Model of the application.
   * @param view View of our application.
   */
  constructor(private readonly model: TrapezoidalRuleModel,
             private readonly view: TrapezoidalRuleView) { 
    
    const functionPoints = this.model.calculateFunctionPoints();
    const trapezoidVertices = this.model.getTrapezoidsVertices();
    this.view.updateSumOfTrapezoids(model.getSumOfTrapezoidAreas());

    this.view.displayEmptyPlane();
    this.view.displayFunction(functionPoints);
    this.view.displayTrapezoids(trapezoidVertices);

    this.view.addUpdateFunctionListener((data) => this.handleFunctionUpdate(data));
  }

  /**
   * Updates the information of the model and displays it in the view.
   * @param newData New range and expression to display.
   */
  private handleFunctionUpdate(newData: TrapezoidalRuleData): void {
    this.model.updateFunction(newData.functionExpression);
    this.model.updateLimits(newData.startingXValue, newData.endingXValue);
    this.model.updateNumberOfTrapezoids(newData.intervals);

    const functionPoints = this.model.calculateFunctionPoints();
    const trapezoidVertices = this.model.getTrapezoidsVertices();

    this.view.updatePlaneLimits(newData.startingXValue, newData.endingXValue, trapezoidVertices);
    this.view.updateSumOfTrapezoids(this.model.getSumOfTrapezoidAreas());

    this.view.displayEmptyPlane();
    this.view.displayFunction(functionPoints);
    this.view.displayTrapezoids(trapezoidVertices);
  }
}