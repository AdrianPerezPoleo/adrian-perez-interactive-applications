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

import { CurveCanvas } from './curve_canvas.js';
import { Point } from '../Model/point.js';
import { InputHandler, CurveData } from './input_handler.js';
import { CurveInformation } from './curve_information.js';

export class LissajousCurvesView {
  /** Canvas used to display the curve. */
  private readonly curveCanvas: CurveCanvas;
  /** Object used to receive the input events started by the user. */
  private readonly inputHandler: InputHandler;
  /** Object containing information about the Lissajous curves. */
  private readonly curveInformation: CurveInformation;

  constructor() {
    this.curveCanvas = new CurveCanvas();
    this.inputHandler = new InputHandler();
    this.curveInformation = new CurveInformation();
  }

  /**
   * Displays a curve on the canvas.
   * @param points Points of the curve.
   */
  drawCurve(points: Point[]): void {
    this.curveCanvas.clear();
    this.curveCanvas.drawCurve(points);
  }

  /**
   * Adds a listener to the ModifyCurve event.
   * @param callback New listener.
   */
  addModifyCurveListener(callback: (data: CurveData) => void) {
    this.inputHandler.addModifyCurveListener(callback);
  }

  /**
   * Adds a listener to the Animate event.
   * @param callback New listener.
   */
  addAnimateListener(callback: (isChecked: boolean) => void) {
    this.inputHandler.addAnimateListener(callback);
  }

  /**
   * Removes the content that is being displayed on the screen.
   */
  clear(): void {
    this.curveCanvas.clear();
  }

  /**
   * Modifies the size of the elements displayed on the screen.
   */
  resize(): void {
    this.curveCanvas.resize();
    this.inputHandler.resize();
    this.curveInformation.resize();
  }

  /**
   * Updates the input fields given a curve's  data.
   * @param data Data that will be places in the input fields.
   */
  updateInputs(data: CurveData): void {
    this.inputHandler.updateInputs(data);
  }

  /**
   * Updates the Phase input elements (input field and slider).
   * @param newPhase New value the Phase input elements will take.
   */
  updatePhase(newPhase: number): void {
    this.inputHandler.updatePhaseInputElements(newPhase);
  }
}