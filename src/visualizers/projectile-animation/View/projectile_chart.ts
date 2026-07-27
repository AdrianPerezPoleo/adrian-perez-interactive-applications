/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 12, 2026
 * @description Class that knows how to display a projectile animation chart.
 */

import {Point} from './point.js';
import {XAxis} from './x_axis.js';
import {YAxis} from './y_axis.js';
import {Projectile} from '../Model/projectile.js' 

/**
 * Class that displays a projectile animation.
 */
export class ProjectileChart {
  /** Max values to be represented in the axis of the chart. */
  private maxXValue: number = 0;
  private maxYValue: number = 0;

  /** Number of displayed lines in the axis. */
  private xSeparation: number = 10;
  private ySeparation: number = 10;

  private xScale: number = 7;
  private yScale: number = 7;

  /** Separation between the canvas borders and the chart borders. */
  private readonly padding: number = 40;

  /**
   * Creates a new instance of a ProjectileChart.
   * @param canvas Canvas where the chart will be displayed.
   * @param context Context used to display the chart.
   */
  constructor(private readonly canvas: HTMLCanvasElement,
              private readonly context: CanvasRenderingContext2D) { }

  /**
   * Calculates the parameters of the chart to display it between two given maximum values.
   * @param maxWidth Maximum value the X axis will display.
   * @param maxHeight Maximum value the Y axis will display.
   */
  configureChartSize(maxWidth: number, maxHeight: number): void {
    this.maxXValue = maxWidth;
    this.maxYValue = maxHeight;
    this.xSeparation = maxWidth / 10;
    this.ySeparation = maxHeight / 10;
    this.xScale = (this.canvas.width - 2 * this.padding) / this.maxXValue;
    this.yScale = (this.canvas.height - 2 * this.padding) / this.maxYValue;
  }

  /**
   * Displays the chart on the screen.
   */
  render(): void {
    this.clear();
    this.displayBackground();
  }

  /**
   * Removes all the information from the screen.
   */
  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Displays the path of the projectile until the current moment.
   * @param projectile Projectile whose path will be displayed.
   * @param color Color of the path.
   */
  displayProjectilePath(projectile: Projectile, color: string = 'red'): void {
    this.context.save();

    this.context.translate(this.padding + 10, this.canvas.height - this.padding);
    const step = 0.1; 
    const currentXPosition = projectile.getCurrentPosition().getXCoordinate();

    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;

    for (let xInMeters = 0; xInMeters <= currentXPosition; xInMeters += step) {
      const yCoordinate = Math.max(0, projectile.getYPositionAt(xInMeters).getYCoordinate());
      this.context.lineTo(xInMeters * this.xScale, yCoordinate * -this.yScale);
    }

    const finalY = Math.max(0, projectile.getYPositionAt(currentXPosition).getYCoordinate());
    this.context.lineTo(currentXPosition * this.xScale, finalY * -this.yScale);

    this.context.stroke();
    this.context.restore();
  }

  /**
   * Displays the body of the projecile that has been launched. 
   * @param projectile Projectile whose body will be displayed.
   * @param color Color of the projectile.
   */
  displayBody(projectile: Projectile, color: string): void {
    if (!projectile) return;
    this.context.save();
    this.context.fillStyle = color;

    this.context.translate(this.padding + 10, this.canvas.height - this.padding);
    const currentPosition = projectile.getCurrentPosition();
    
    this.context.beginPath();
    const yCoordinate = Math.max(0, currentPosition.getYCoordinate() * this.yScale) 
    this.context.arc(currentPosition.getXCoordinate() * this.xScale, -yCoordinate, 20, 0, Math.PI * 2);

    this.context.fill();
    this.context.restore();
  }

  /**
   * Displays the canon of a projectile.
   * @param projectile Projectile whose canon will be displayed.
   */
  displayCanon(projectile: Projectile): void {
    this.context.save();

    const floorY = this.canvas.height - this.padding;
    const heightInPixels = projectile.getHeight() * this.yScale;
    
    this.context.translate(this.padding + 10, floorY - heightInPixels);
    this.context.rotate(-projectile.getAngle());

    this.context.strokeStyle = 'black';
    this.context.lineWidth = 3;

    const length = 20;
    const arrowSize = 6;

    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(length, 0);

    this.context.lineTo(length - arrowSize, -arrowSize / 2);
    this.context.moveTo(length, 0);
    this.context.lineTo(length - arrowSize, arrowSize / 2);

    this.context.stroke();
    this.context.restore();    
  }

  /**
   * Method used to dsplay the background of the chart.
   */
  private displayBackground(): void {
    this.context.save();
    const origin = new Point(0, 0);

    this.context.translate(this.padding + 10, this.canvas.height - this.padding);
    const endX = new Point(this.canvas.width - (this.padding * 2), 0);
    const endY = new Point(0, -(this.canvas.height - (this.padding * 2)));

    const xAxis = new XAxis(origin, endX, this.xSeparation, this.xScale);
    const yAxis = new YAxis(origin, endY, this.ySeparation, this.yScale);

    xAxis.draw(this.canvas);
    yAxis.draw(this.canvas);
    this.context.restore();
  }

}