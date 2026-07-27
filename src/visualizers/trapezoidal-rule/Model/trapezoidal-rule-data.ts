/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Data needed to update the application when the model interacts.
 */

/**
 * Interface containing the parameters needed to update the application.
 */
export interface TrapezoidalRuleData {
  functionExpression: string;
  startingXValue: number;
  endingXValue: number;
  intervals: number;
}