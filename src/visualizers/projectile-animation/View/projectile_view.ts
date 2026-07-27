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

import {Projectile} from '../Model/projectile.js';
import {ProjectileChart} from './projectile_chart.js';
import {InputHandler, ProjectileInformation} from './input-handler.js';
import {LaunchInformationCanvas} from './launch_information_canvas.js';

/**
 * Class that displays a projectile animation. It uses the Facade patter dessign.
 */
export class ProjectileView {
  /** Canvas where the projectile animation will be displayed. */
  private readonly chartCanvas: HTMLCanvasElement;
  private readonly informationCanvas: HTMLCanvasElement;

  /** Rendering context used to display the canvas. */
  private readonly chartContext: CanvasRenderingContext2D;
  private readonly informationContext: CanvasRenderingContext2D;

  /** Object that knows how to display the chart. */
  private chart: ProjectileChart;

  /** Object that handles the interactions of the users with our application. */
  private inputHandler: InputHandler;

  /** Canvas that prints infomation about the last launch done. */
  private informationPanel: LaunchInformationCanvas;

  /**
   * Creates a new instance of a projectile view object.
   */
  constructor() {
    this.chartCanvas = document.createElement('canvas') as HTMLCanvasElement;
    this.chartContext = this.chartCanvas.getContext('2d')!;

    this.informationCanvas = document.createElement('canvas') as HTMLCanvasElement;
    this.informationContext = this.informationCanvas.getContext('2d')!;

    const htmlPosition: HTMLDivElement = document.getElementById('projectile-animation') as HTMLDivElement;
    htmlPosition.appendChild(this.chartCanvas);
    htmlPosition.appendChild(this.informationCanvas);
    
    this.chart = new ProjectileChart(this.chartCanvas, this.chartContext);
    this.chart.configureChartSize(0, 0);
    this.resize();

    this.inputHandler = new InputHandler('height_input', 'speed_input', 'angle_input', 'animate_button', 'trajectory_id');
    this.informationPanel = new LaunchInformationCanvas(this.informationCanvas, this.informationContext);
  }

  /**
   * Adds listeners to the input handler.
   * @param callback Method to be executed when the Animate button is clicked.
   */
  addAnimateListener(callback: (projectileData: ProjectileInformation) => void) {
    this.inputHandler.addAnimateListener(callback);
  }

  /**
   * Adds a new listener to the event of showing the trajectory.
   * @param callback Method to execute when user clicks the 'Show Trajectory' checkbox.
   */
  addShowTrajectoryListener(callback: (hideTrajectory: boolean) => void) {
    this.inputHandler.addShowTrajectoryListener(callback);
  }

  /**
   * Displays the Projectile Animation information on the screen.
   */
  render(): void {
    this.chart.render();
  }

  /**
   * Removes all the displayed information in the view.
   */
  clear(): void {
    this.chart.clear();
  }

  /**
   * Displays the canon that has launched the projectile. It has an arrow shape.
   * @param projectile Projectile that has been launched.
   */
  displayCanon(projectile: Projectile): void {
    this.chart.displayCanon(projectile);
  }

  /**
   * Displays the last launch metrics on the information canvas.
   */
  displayInformationCanvas(): void {
    this.informationPanel.displayInformation();
  }

  /**
   * Displays the body (a circle) of the projectile.
   * @param projectile Projectile whose body will be displayed.
   * @param color Color of the projectile.
   */
  displayBody(projectile: Projectile, color: string = 'black'): void {
    this.chart.displayBody(projectile, color);
  }

  /**
   * Updates the information of the last launch into the information canvas.
   * @param newTime New instance of time to be displayed.
   * @param newDistance New distance travelled by the projectile.
   * @param newHeight Height reached by the projectile.
   * @param projectile Projectile whose information is being stored.
   */
  updateInformationCanvas(newTime: number, newDistance: number, newHeight: number, projectile: Projectile) {
    this.informationPanel.updateInformation(newTime, newDistance, newHeight, projectile);
  }

  /**
   * Displays the last launch information in the information canvas. 
   */
  displayInformation(): void {
    this.informationPanel.displayInformation();
  }
  
  /**
   * Displays the given projectiles on the chart.
   * @param projectiles Projectiles to be displayed on the screen.
   * @param printTrajectory Prints the trajectory of the given projectiles.
   */
  displayProjectiles(projectiles: Projectile[], printTrajectory: boolean): void {
    if (projectiles.length === 0) {
      this.chart.render(); 
      return;
    }
    const maxXValue = projectiles[0].getRange() * 1.2; // 1.2 to make the axis a bit larger
    const maxYValue = projectiles[0].getMaxHeight() * 1.2;
    this.chart.configureChartSize(maxXValue, maxYValue);
    this.chart.render();

    const COLOR = ['red', 'blue', 'yellow', 'green', 'cyan', 'purple', 'aquamarine'];
    for (let i = 0; i < projectiles.length; i++) {
      const color = COLOR[i % COLOR.length];
      const isCurrentProjectile = (i === projectiles.length - 1);

      if (isCurrentProjectile && !printTrajectory) {
        this.chart.displayBody(projectiles[i], color);
      } else {
        this.chart.displayProjectilePath(projectiles[i], color);
      }
    }
  }
  
  /**
   * Changes the size of the view when the windows is resized.
   */
  resize(): void {
    const container = document.getElementById('projectile-animation');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const topOffset = rect.top;

    const footer = document.querySelector('footer');
    const footerHeight = footer ? footer.offsetHeight : 0;

    const availableHeight = window.innerHeight - topOffset - footerHeight - 20;
    const availableWidth = window.innerWidth - 20;

    this.chartCanvas.width = availableWidth;
    this.chartCanvas.height = 0.8 * availableHeight;
    
    this.informationCanvas.width = availableWidth;
    this.informationCanvas.height = 0.2 * availableHeight;

    this.render();
  }
}