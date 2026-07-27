/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that knows how to display a projectile animation.
 */

import {Event} from '../event.js';

/**
 * Data introduced by the user in the differents input fields.
 */
export interface ProjectileInformation {
  initialHeight: number;
  initialSpeed: number;
  initialAngle: number;
}

/**
 * Class that displays a projectile animation.
 */
export class InputHandler {
  /** Event that contains the listeners of this class. */
  private readonly animateEvent = new Event<ProjectileInformation>;

  /** Event that informs when the user selects the checkbox. */
  private readonly printTrajectoryEvent = new Event<boolean>;

  /** Input field where the height must be introduced. */
  private readonly heightInput: HTMLInputElement;

  /** Input field where the speed must be introduced. */
  private readonly speedInput: HTMLInputElement;

  /** Input field where the angle must be introduced. */
  private readonly angleInput: HTMLInputElement;

  /** Button that will animate a new projectile. */
  private readonly animateButton: HTMLButtonElement;

  /** Checkbox that indicates if the trajectory must be shown. */
  private readonly printTrajectoryInput: HTMLInputElement;

  constructor(heightId: string, speedId: string, angleId: string, buttonId: string, trajectoryId: string) {
    this.heightInput = document.getElementById(heightId) as HTMLInputElement;
    this.angleInput = document.getElementById(angleId) as HTMLInputElement;
    this.speedInput = document.getElementById(speedId) as HTMLInputElement;
    this.animateButton = document.getElementById(buttonId) as HTMLButtonElement;
    this.printTrajectoryInput = document.getElementById(trajectoryId) as HTMLInputElement;
   
    this.animateButton.addEventListener('click', () => {
      const readHeight = Number(this.heightInput.value);
      const readSpeed = Number(this.speedInput.value);
      const readAngle = Number(this.angleInput.value);
      const readInformation: ProjectileInformation = {initialHeight: readHeight, initialSpeed: readSpeed, initialAngle: readAngle};
      console.log(readInformation);

      this.printTrajectoryEvent.trigger(this.printTrajectoryInput.checked);
      this.animateEvent.trigger(readInformation);
    })

    this.printTrajectoryInput.addEventListener('click', () => {
      this.printTrajectoryEvent.trigger(this.printTrajectoryInput.checked);
    })

  }

  /**
   * Adds a new listener to the Animate Event.
   * @param callback Method to execute when the event triggers.
   */
  addAnimateListener(callback: (information: ProjectileInformation) => void) {
    this.animateEvent.addListener(callback);
  }

  addShowTrajectoryListener(callback: (print: boolean) => void) {
    this.printTrajectoryEvent.addListener(callback);
  }


}