/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Program that displays a projectile animation.
 */

import {ProjectileView} from './View/projectile_view.js';
import {ProjectileModel} from './Model/projectile_model.js';
import {ProjectileController} from './Controller/projectile_controller.js';

/**
 * Main function of the program.
 */
function main() {
  const model = new ProjectileModel();  
  const view = new ProjectileView();
  const controller = new ProjectileController(model, view);
};

main();