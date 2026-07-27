/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 18, 2026
 * @description Program that displays the Lissajous Curves.
 */

import { LissajousCurvesView } from './View/lissajous_curves_view.js';
import { LissajousCurvesModel } from './Model/lissajous_curves_model.js';
import { LissajousCurvesController } from './Controller/lissajous_curves_controller.js';

/**
 * Main function of the program.
 */
export function main() {
  const model = new LissajousCurvesModel();  
  const view = new LissajousCurvesView();
  const controller = new LissajousCurvesController(model, view);
};

main();