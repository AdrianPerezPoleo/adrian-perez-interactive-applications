/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 12, 2026
 * @desc Main program of the application.
 */

import {EightPuzzleController} from './Controller/eight-puzzle-controller';
import {EightPuzzleModel} from './Model/eight-puzzle-model';
import {EightPuzzleView} from './View/eight-puzzle-view';

/**
 * Main function of the program
 */
export function main(): void {
  const model = new EightPuzzleModel();
  const view = new EightPuzzleView();
  new EightPuzzleController(model, view);
}

main();