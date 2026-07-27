/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 09, 2026
 * @desc Class that displays a grid and cartesian axes.
 */

import {Point} from '../Model/point';
import {CartesianPlaneConfiguration} from './cartesian-plane-configuration';
import {Grid} from './grid';
import {XAxis} from './x-axis';
import {YAxis} from './y-axis';

/**
 * Class that displays a cartesian plane.
 */
export class CartesianPlane {
  /** Grid where the axes are displayed. */
  private readonly grid: Grid;
  /** X axis of the cartesian plane. */
  private readonly xAxis: XAxis;
  /** Y axis of the cartesian plane. */
  private readonly yAxis: YAxis;
  /** Number of pixels needed to represent a unit in the x axis. */
  private readonly pixelsPerUnitX: number;
  /** Number of pixels needed to represent a unit in the y axis. */
  private readonly pixelsPerUnitY: number;
  /** Separation between the div and the cartesian plane. */
  private readonly padding: number = 45;

  /**
   * 
   * @param canvas Canvas needed to display the cartesian plane.
   * @param context Tools needed to display the plane.
   * @param configuration Object containing the parameters of the cartesian plane.
   */
  constructor(private readonly canvas: HTMLCanvasElement,
    private readonly context: CanvasRenderingContext2D,
    private readonly configuration: CartesianPlaneConfiguration) {
    
    const drawWidth = this.canvas.width - (this.padding * 2);
    const drawHeight = this.canvas.height - (this.padding * 2);

    const rangeX = this.configuration.maximumXValue - this.configuration.minimumXValue;
    const rangeY = this.configuration.maximumYValue - this.configuration.minimumYValue;

    this.pixelsPerUnitX = drawWidth / rangeX;
    this.pixelsPerUnitY = drawHeight / rangeY;

    const trueOrigin: Point = this.translateToCanvasCoordinates({
      xCoordinate: 0, 
      yCoordinate: 0
    });

    const xAxisOrigin: Point = this.translateToCanvasCoordinates({
      xCoordinate: 0, 
      yCoordinate: this.configuration.minimumYValue
    });
    const yAxisOrigin: Point = this.translateToCanvasCoordinates({
      xCoordinate: this.configuration.minimumXValue, 
      yCoordinate: 0
    });

    this.grid = new Grid(trueOrigin, this.pixelsPerUnitX, this.pixelsPerUnitY, this.configuration);
    this.xAxis = new XAxis(xAxisOrigin, 
        this.configuration.minimumXValue, 
        this.configuration.maximumXValue, 
        this.pixelsPerUnitX, 
        this.configuration.scaleXAxis);
    this.yAxis = new YAxis(yAxisOrigin, 
        this.configuration.minimumYValue,
        this.configuration.maximumYValue, 
        this.pixelsPerUnitY, 
        this.configuration.scaleYAxis);
  }

  /**
   * Converts the coordinates of a point we want to represent into real coordinates in the canvas.
   * @param pointToTranslate Point whose coordinates will be translated.
   * @return Point with the translated coordinates.
   */
  translateToCanvasCoordinates(pointToTranslate: Point): Point {
    const canvasX = this.padding + ((pointToTranslate.xCoordinate - this.configuration.minimumXValue) * this.pixelsPerUnitX);
    const canvasY = this.padding + ((this.configuration.maximumYValue - pointToTranslate.yCoordinate) * this.pixelsPerUnitY);
    
    return {xCoordinate: canvasX, yCoordinate: canvasY};
  }

  /**
   * Displays the cartesian plane on the canvas.
   */
  draw(): void {
    this.grid.draw(this.context);
    this.xAxis.draw(this.context, this.canvas);
    this.yAxis.draw(this.context, this.canvas);
  }
}