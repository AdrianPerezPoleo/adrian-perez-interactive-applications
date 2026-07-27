/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 18, 2026
 * @description Controller that interacts with the model and view of the application.
 */

import { LissajousCurvesModel } from '../Model/lissajous_curves_model.js';
import { LissajousCurvesView } from '../View/lissajous_curves_view.js';
import { CurveData } from '../View/input_handler.js';

/**
 * Controller of the application (following the MVC pattern)
 */
export class LissajousCurvesController {
  /** True if the application is running and the animation must be executing. */
  isRunning : boolean = true;
  /** Last phase of the curve that was displayed in the animation. */
  lastPhaseShown: number = 0;

  /**
   * Creates a new instance of a controller.
   * @param model Model of the application that contains the parameters of the curve.
   * @param view Class that creates the interface of our application.
   */
  constructor(private readonly model: LissajousCurvesModel,
              private readonly view: LissajousCurvesView) {
    this.view.drawCurve(this.model.getCurvePoints(2000));

    window.addEventListener('resize', () => {
      this.view.resize();
      this.view.drawCurve(this.model.getCurvePoints(2000));
    })

    this.setListeners();
    this.run();
  }

  /**
   * Starts the animation of the curve.
   */
  run(): void {
    this.animateCurve(0);
  }

  /**
   * Sets the listeners of the ModifyCurve and Animate events (both in the View).
   */
  private setListeners(): void {
    this.view.addModifyCurveListener((data) => {
      this.handleModifyCurve(data)
      this.view.updateInputs(data);
    });

    this.view.addAnimateListener((isChecked) => this.handleAnimateEvent(isChecked));
  }

  /**
   * Modifies the parameters of the curve in the model and the asks the View to displays those new parameters.
   * @param data Parameters of the curve that is stored.
   */
  private handleModifyCurve(data: CurveData): void {
    this.model.setXAxisAmplitude(data.xAmplitude);
    this.model.setYAxisAmplitude(data.yAmplitude);
    this.model.setFirstAngularFrequency(data.firstAngularFrequency);
    this.model.setSecondAngularFrequency(data.secondAngularFrequency);
    this.model.setPhase(data.phase);
    this.lastPhaseShown = data.phase;
    this.view.drawCurve(this.model.getCurvePoints(2000));
  }

  /**
   * Starts or stops the animation when the Animate event is triggered.
   * @param isChecked Value of the checkbox that indicates if the animation must be displayed.
   */
  private handleAnimateEvent(isChecked: boolean): void {
    this.isRunning = isChecked;
    if (isChecked) this.animateCurve(this.lastPhaseShown);
  }

  /**
   * Animates the curve that is being printed on the View.
   * @param timestamp Momento that is being displayed.
   */
  private readonly animateCurve = (timestamp: number) => {
    if (!this.isRunning) return;

    const increment = 0.001; 
    this.lastPhaseShown = (this.lastPhaseShown + increment) % 2;
    this.model.setPhase(this.lastPhaseShown * Math.PI);

    this.view.clear();

    this.view.updatePhase(this.lastPhaseShown); 
    this.view.drawCurve(this.model.getCurvePoints(2000));

    requestAnimationFrame(this.animateCurve);
  }
}