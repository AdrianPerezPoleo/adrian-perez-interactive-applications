/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that stores the projectile introduced by the user.
 */

import {Projectile} from './projectile.js';

/**
 * Class that displays a projectile animation.
 */
export class ProjectileModel {
  /**
   * Creates a new instance of a model that stores projectiles.
   * @param projectiles Projectiles that will be stored.
   */
  constructor(private projectiles: Projectile[] = []) { }

  /**
   * Returns the projectiles that have been stored by the user.
   * @returns Vector containing the projectiles stored by the user.
   */
  getProjectiles(): Projectile[] {
    return this.projectiles;
  }

  /**
   * Returns the last projectile to be stored in the model.
   * @return Last projectile to be stored.
   */
  getLastProjectile(): Projectile {
    return this.projectiles[this.projectiles.length - 1];
  }

  /**
   * Adds a new projectile to the ones already stored.
   * @param projectile Projectile to be stored.
   */
  addProjectile(projectile: Projectile): void {
    this.projectiles.push(projectile);
  }

  /**
   * Removes all the stored projectiles from the model.
   */
  clearProjectiles(): void {
    this.projectiles = [];
  }

  /**
   * Updates the time of all the projectiles stored in the model.
   * @param deltaTime Amount of time that has passed.
   */
  updateCurrentTime(deltaTime: number): void {
    for (const projectile of this.projectiles) {
      projectile.update(deltaTime);
    }
  }
}