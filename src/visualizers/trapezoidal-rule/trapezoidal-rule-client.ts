/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc Trapezoidal Rule Calculator main client.
 */

import {TrapezoidalRuleModel} from './Model/trapezoidal-rule-model';
import {TrapezoidalRuleView} from './View/trapezoidal-rule-view';
import {TrapezoidalRuleController} from './Controller/trapezoidal-rule-controller';

/**
 * Main function of the program.
 */
export function main(): void {
  const model = new TrapezoidalRuleModel();
  const view = new TrapezoidalRuleView();
  new TrapezoidalRuleController(model, view);
}

main();