/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that communicates the view and the model of our application.
 */

import {Projectile} from '../Model/projectile.js';
import {ProjectileView} from '../View/projectile_view.js';
import {ProjectileModel} from '../Model/projectile_model.js';
import {ProjectileInformation} from '../View/input-handler.js';

/**
 * Class that displays a projectile animation.
 */
export class ProjectileController {
  /** Attribute that indicates if the controller has been already run. */
  private isRunning: boolean = false;

  /** Last time the projectile was shown. */
  private lastShownTime: number = 0.0;

  /** Flag that indicates if the trajectory must be displayed or not. */
  private printTrajectory: boolean = true;

  /**
   * Creates a new instance of a controller.
   * @param model Model that contains the data of the application.
   * @param view View that defines how to display the information.
   */
  constructor(private readonly model: ProjectileModel,
              private readonly view: ProjectileView) { 
    this.view.addAnimateListener((info) => this.handleAnimateEvent(info));
    this.view.addShowTrajectoryListener((print) => this.printTrajectory = print);
    window.addEventListener('resize', () => this.handleResizeEvent());
    
    this.run();
  }

  /**
   * Method that executes the application.
   */
  run(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    requestAnimationFrame(this.animateProjectile);
  }

  /**
   * Defines how to act when the animate event is triggered.
   * @param projectileInformation Information needed to create a projectile.
   */
  private handleAnimateEvent(projectileInformation: ProjectileInformation): void {
    const newProjectile = new Projectile(projectileInformation.initialHeight, 
                                         projectileInformation.initialSpeed, 
                                         projectileInformation.initialAngle);
    this.model.addProjectile(newProjectile);
    this.displayProjectiles();
    this.view.displayCanon(newProjectile);
  }

  /**
   * Defines how to resize the view when the window is resized.
   */
  private handleResizeEvent(): void {
    this.view.resize();
    this.displayProjectiles();
    this.view.displayCanon(this.model.getLastProjectile());
  }

  /**
   * Asks the view to display all the projectiles stored in the model.
   */
  private displayProjectiles(): void {
    const projectiles: Projectile[] = this.model.getProjectiles();
    this.view.clear();
    
    this.view.displayProjectiles(projectiles, this.printTrajectory);
    if (projectiles.length > 0) {
      this.view.displayCanon(this.model.getLastProjectile());
    }
  }

  /**
   * Animates a projectile showing its path interactively.
   * @param currentTime Current time of the animation. 
   */
  private animateProjectile = (currentTime: number): void => {
    if (!this.isRunning) return;
    const deltaSeconds = currentTime - this.lastShownTime;
    this.lastShownTime = currentTime;
    const deltaTime = Math.min(deltaSeconds / 1000, 0.05);

    this.model.updateCurrentTime(deltaTime);
    this.view.clear();

    if (this.model.getProjectiles().length > 0) {
      const lastProjectile = this.model.getLastProjectile(); 
      this.view.updateInformationCanvas(Math.min(lastProjectile.getTotalFlightTime(), lastProjectile.getCurrentTime()), 
                             lastProjectile.getCurrentPosition().getXCoordinate(),
                             lastProjectile.getCurrentPosition().getYCoordinate(),
                             lastProjectile)
      this.view.displayInformation();
    }
    this.displayProjectiles();
    requestAnimationFrame(this.animateProjectile);
  }
}