/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 09, 2026
 * @desc Class that displays a function on a canvas with a grid and cartesian axes.
 */

import {Point} from '../Model/point';
import {CartesianPlane} from './cartesian-plane';
import {CartesianPlaneConfiguration} from './cartesian-plane-configuration';

/**
 * Class that displays a function on a cartesian plane.
 */
export class FunctionDisplay {
  /** Canvas where the view is displayed. */
  private readonly canvas: HTMLCanvasElement;
  /** Tools used to display the interface. */
  private readonly context: CanvasRenderingContext2D;
  /** Cartesian Plane in the background of our representations. */
  private cartesianPlane: CartesianPlane;

  /**
   * Creates a new Function Display object.
   * @param container Container where the canvas must be displayed.
   * @param configuration Parameters used to configure the grid (minimum Y value, maximum Y value, etc.)
   */
  constructor(container: HTMLDivElement, private readonly configuration: CartesianPlaneConfiguration) {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    container.appendChild(this.canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d')!;

    this.cartesianPlane = new CartesianPlane(this.canvas, this.context, this.configuration);
  }

  /**
   * Removes the content from the canvas.
   */
  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Displays the application interface on the screen.
   */
  displayEmptyPlane(): void {
    this.clear();
    this.drawBackground();
  }

  /**
   * Display a function in the canvas.
   * @param functionPoints POints of the function to be displayed.
   */
  displayFunction(functionPoints: Point[]): void {
    const translatedPoints = functionPoints.map((point) => this.cartesianPlane.translateToCanvasCoordinates(point));

    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 4;

    this.context.moveTo(translatedPoints[0].xCoordinate, translatedPoints[0].yCoordinate);
    for (const point of translatedPoints) {
      this.context.lineTo(point.xCoordinate, point.yCoordinate);
    }

    this.context.stroke();
    this.context.restore();
  }

  /**
   * Displays the vertices of the trapezoids used in the application
   * @param vertices Vertices of the trapezoids used to calculate the integral.
   */
  displayTrapezoidVertices(vertices: Point[]): void {
    const translatedVertices = vertices.map((vertex) => this.cartesianPlane.translateToCanvasCoordinates(vertex));
    for (const vertex of translatedVertices) {
      this.displayPoint(vertex, 6, 'red');
    }
  }

  /**
   * Displays the trapezoids used to approximate the are under the function.
   * @param vertices Vertices of the trapezoids.
   */
  displayTrapezoids(vertices: Point[]): void {
    if (vertices.length < 2) return;
    const originPoint = this.cartesianPlane.translateToCanvasCoordinates({xCoordinate: 0, yCoordinate: 0});
    const xAxisYCoordinate = originPoint.yCoordinate;

    const translatedVerticesPoints = vertices.map(point => this.cartesianPlane.translateToCanvasCoordinates(point));
    for (let i = 0; i < translatedVerticesPoints.length - 1; ++i) {
      const currentPoint = translatedVerticesPoints[i];
      const nextPoint = translatedVerticesPoints[i + 1];
     
      this.displayTrapezoid(currentPoint, nextPoint, xAxisYCoordinate);
    }
    this.context.restore();
  }

  /**
   * Updates the limits in the X axis.
   * @param minimumXValue New minimum X value.
   * @param maximumXValue New maximum X value.
   */
  updateXLimits(minimumXValue: number, maximumXValue: number): void {
    if (minimumXValue >= maximumXValue) {
      this.configuration.minimumXValue = minimumXValue;
      this.configuration.maximumXValue = maximumXValue;       
    } else {
      this.configuration.minimumXValue = minimumXValue;
      this.configuration.maximumXValue = maximumXValue;
    }
    const rangeX = maximumXValue - minimumXValue;
    this.configuration.scaleXAxis = parseFloat((rangeX / 5).toPrecision(1)); 
    this.cartesianPlane = new CartesianPlane(this.canvas, this.context, this.configuration);
    this.displayEmptyPlane();
  }

  /**
   * Updates the limits in the Y axis using the highest and lowest trapezoid vertices.
   * @param minimumXValue New minimum Y value.
   * @param maximumXValue New maximum Y value.
   */
  updateYLimitsUsingTrapezoidVertices(functionPoints: Point[]): void {
    if (functionPoints.length === 0) return;

    const yValues = functionPoints.map(point => point.yCoordinate);
    let lowestVertexYCoordinate = Math.min(0, ...yValues);
    let highestVertexYCoordinate = Math.max(0, ...yValues);

    if (lowestVertexYCoordinate === highestVertexYCoordinate) {
      lowestVertexYCoordinate = -1;
      highestVertexYCoordinate = 1;
    }
    
    this.configuration.minimumYValue = lowestVertexYCoordinate;
    this.configuration.maximumYValue = highestVertexYCoordinate;
    const yAxisRange = highestVertexYCoordinate - lowestVertexYCoordinate;
    this.configuration.scaleYAxis = parseFloat((yAxisRange / 10).toPrecision(1));

    this.cartesianPlane = new CartesianPlane(this.canvas, this.context, this.configuration);
    this.displayEmptyPlane();
  }

  /**
   * Displays the background of the cartesian axes.
   */
  private drawBackground(): void {
    this.cartesianPlane.draw();
  }

  /**
   * Displays a point in the canvas.
   * @param point Point to be displayed.
   * @param radius Radius of the point to display.
   * @param color Color of the point to display.
   */
  private displayPoint(point: Point, radius: number, color: string) {
    this.context.save();

    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(point.xCoordinate, point.yCoordinate, radius, 0, Math.PI * 2);
    this.context.fill();

    this.context.restore();
  }

  /**
   * Displays a trapezoid known its vertices and the position of the X Axis.
   * @param firstVertex Top left vertex of the trapezoid.
   * @param secondVertex Top right vertex of the trapezoid.
   * @param xAxisYCoordinate Coordinate y of the X axis in the canvas.
   */
  private displayTrapezoid(firstVertex: Point, secondVertex: Point, xAxisYCoordinate: number) {
    this.context.save();

    this.context.fillStyle = 'purple';
    this.context.strokeStyle = 'purple';
    this.context.lineWidth = 1;


    this.context.beginPath(); 
    this.context.moveTo(firstVertex.xCoordinate, xAxisYCoordinate);
    this.context.lineTo(firstVertex.xCoordinate, firstVertex.yCoordinate);
    this.context.lineTo(secondVertex.xCoordinate, secondVertex.yCoordinate);
    this.context.lineTo(secondVertex.xCoordinate, xAxisYCoordinate);
    this.context.closePath();

    this.context.globalAlpha = 0.4;
    this.context.fill();

    this.context.globalAlpha = 1.0;
    this.context.beginPath();
    this.context.setLineDash([]);
    // Top line of the trapezoid
    this.context.moveTo(firstVertex.xCoordinate, firstVertex.yCoordinate);
    this.context.lineTo(secondVertex.xCoordinate, secondVertex.yCoordinate);
    this.context.stroke(); 
  
    this.context.beginPath();
    this.context.setLineDash([15, 10]);
    // Side lines of the trapezoid.
    this.context.moveTo(firstVertex.xCoordinate, xAxisYCoordinate);
    this.context.lineTo(firstVertex.xCoordinate, firstVertex.yCoordinate);
    this.context.moveTo(secondVertex.xCoordinate, xAxisYCoordinate);
    this.context.lineTo(secondVertex.xCoordinate, secondVertex.yCoordinate);
    
    this.context.stroke();
    this.context.restore();
  }
}