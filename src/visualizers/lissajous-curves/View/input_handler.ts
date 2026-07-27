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

import { Event } from '../event.js';

/**
 * Information needed to modify a Lissajous curve.
 */
export interface CurveData {
  xAmplitude: number,
  yAmplitude: number,
  firstAngularFrequency: number,
  secondAngularFrequency: number,
  phase: number
}

/**
 * Class that receives the input events.
 */
export class InputHandler {
  /** Column where the input elements are */
  private readonly column: HTMLDivElement;
  /** Input field where the user introduces the X axis amplitude */
  private readonly xAxisAmplitudeInput: HTMLInputElement;
  /** Input field where the user introduces the Y axis amplitude */
  private readonly yAxisAmplitudeInput: HTMLInputElement;
  /** Input field where the user introduces first angular frequency */
  private readonly firstAngularFrequencyInput: HTMLInputElement;
  /** Input field where the user introduces second angular frequency */
  private readonly secondAngularFrequencyInput: HTMLInputElement;
  /** Input field where the user introduces phase to be evaluated */
  private readonly phaseInput: HTMLInputElement;

  /** Slider where the user introduces the X axis amplitude */
  private readonly xAxisAmplitudeSlider: HTMLInputElement;
  /** Slider where the user introduces the Y axis amplitude */
  private readonly yAxisAmplitudeSlider: HTMLInputElement;
  /** Slider where the user introduces first angular frequency */
  private readonly firstAngularFrequencySlider: HTMLInputElement;
  /** Slider where the user introduces second angular frequency */
  private readonly secondAngularFrequencySlider: HTMLInputElement;
  /** Slider where the user introduces phase to be evaluated */
  private readonly phaseSlider: HTMLInputElement;
  /** Checkbos that knows if the animation must be executed. */
  private readonly animateCheckbox: HTMLInputElement;
  /** Event triggered when the user modifies an input element. */
  private readonly modifyCurveEvent = new Event<CurveData>;
  /** Event triggered when the user wants to start/stop the animation. */
  private readonly animateEvent = new Event<boolean>;

  constructor() {
    this.column = document.getElementById('div-input') as HTMLDivElement;
    this.column.style.backgroundColor = 'whitesmoke';

    this.createText('First Angular Frequency');
    this.firstAngularFrequencyInput = this.createInputElement('6');
    this.firstAngularFrequencySlider = this.createSlider(0, 20, 6, 1);

    this.createText('Second Angular Frequency');
    this.secondAngularFrequencyInput = this.createInputElement('7');
    this.secondAngularFrequencySlider = this.createSlider(0, 20, 7, 1);

    this.createText('X Axis Amplitude');
    this.xAxisAmplitudeInput = this.createInputElement('100');
    this.xAxisAmplitudeSlider = this.createSlider(0, 300, 100, 1);

    this.createText('Y Axis Amplitude');
    this.yAxisAmplitudeInput = this.createInputElement('100');
    this.yAxisAmplitudeSlider = this.createSlider(0, 200, 100, 1);

    this.createText('Phase');
    this.phaseInput = this.createInputElement('0.0');
    this.phaseSlider = this.createSlider(0, 2, 0, 0.01);

    this.createText('Animate');
    this.animateCheckbox = this.createCheckbox();

    this.setInputListener(this.firstAngularFrequencyInput);
    this.setInputListener(this.secondAngularFrequencyInput);
    this.setInputListener(this.xAxisAmplitudeInput);
    this.setInputListener(this.yAxisAmplitudeInput);
    this.setInputListener(this.phaseInput);

    this.setSliderListener(this.firstAngularFrequencySlider);
    this.setSliderListener(this.secondAngularFrequencySlider);
    this.setSliderListener(this.xAxisAmplitudeSlider);
    this.setSliderListener(this.yAxisAmplitudeSlider);
    this.setSliderListener(this.phaseSlider);

    this.setAnimateListener();
  }

  /**
   * Adds listeners to the ModifyCurve event.
   * @param callback New method to be execute when the event is triggered.l
   */
  addModifyCurveListener(callback: (data: CurveData) => void) {
    this.modifyCurveEvent.addListener(callback);  
  }

  /**
   * Adds listeners to the Animate event.
   * @param callback New method to be execute when the event is triggered.l
   */
  addAnimateListener(callback: (isChecked: boolean) => void) {
    this.animateEvent.addListener(callback);
  }

  /**
   * Modifies the size of the Div containing the buttons and sliders.
   */
  resize(): void {
    const availableHeight = window.innerHeight;

    this.column.style.width = String(document.documentElement.clientWidth * 0.295) + 'px';
    this.column.style.height = String(0.84 * availableHeight) + 'px';   
  }

  /**
   * Addas event listeners to the given element.
   * @param inputElement Element to be added an input listener.
   */
  private setInputListener(inputElement: HTMLInputElement): void {
    inputElement.addEventListener('input', () => {
      const curveData = {
        xAmplitude: Math.min(Number(this.xAxisAmplitudeInput.value), 300),
        yAmplitude: Math.min(Number(this.yAxisAmplitudeInput.value), 200),
        firstAngularFrequency: Math.min(Number(this.firstAngularFrequencyInput.value), 20),
        secondAngularFrequency: Math.min(Number(this.secondAngularFrequencyInput.value), 20),
        phase: Math.min(Number(this.phaseInput.value), 2)
      };
      this.modifyCurveEvent.trigger(curveData);
    })
  }

  /**
   * Addas event listeners to the given element.
   * @param inputElement Slider to be added an input listener.
   */
  private setSliderListener(sliderElement: HTMLInputElement): void {
    sliderElement.addEventListener('input', () => {
      const curveData = {
        xAmplitude: Number(this.xAxisAmplitudeSlider.value),
        yAmplitude: Number(this.yAxisAmplitudeSlider.value),
        firstAngularFrequency: Number(this.firstAngularFrequencySlider.value),
        secondAngularFrequency: Number(this.secondAngularFrequencySlider.value),
        phase: Number(this.phaseSlider.value)
      };
      this.modifyCurveEvent.trigger(curveData);
    })    
  }

  /**
   * Adds a listener to the checkbox to know when it is clicked.
   */
  private setAnimateListener(): void {
    this.animateCheckbox.addEventListener('click', () => {
      this.animateEvent.trigger(this.animateCheckbox.checked);
    })
  }

  /**
   * Creates an input field in the application interface.
   * @param defaultValue Default value in the input field.
   * @return Input field that has been created. 
   */
  private createInputElement(defaultValue: string): HTMLInputElement {
    const input = document.createElement('input') as HTMLInputElement;
    input.value = defaultValue;
    input.style.display = 'block';
    input.style.width = '60%'; 
    input.style.margin = '0 auto 10px auto';

    this.column.appendChild(input);
    return input;
  }

  /**
   * Creates a new slider in the interface.
   * @param minimumVale Minimum value the slider can have.
   * @param maximumValue Maximum value the slider can have.
   * @param defaultValue Default value of the slider.
   * @param step Step taken when the user advances the slider.
   * @return New slider that has been created. 
   */
  private createSlider(minimumVale: number, maximumValue: number, defaultValue: number, step: number): HTMLInputElement {
    const sliderElement = document.createElement('input') as HTMLInputElement;
    sliderElement.type = 'range';
    sliderElement.min = String(minimumVale);
    sliderElement.max = String(maximumValue);
    sliderElement.step = String(step);
    sliderElement.value = String(defaultValue);

    sliderElement.style.width = '60%';
    sliderElement.style.display = 'block';
    sliderElement.style.margin = '0 auto 5px auto';

    this.column.appendChild(sliderElement);
    return sliderElement;
  }

  /**
   * Creates an input element (<p>) in the application. 
   * @param stringToPrint String that will be printed on the interface.
   */
  private createText(stringToPrint: string): void {
    const textElement = document.createElement('p');
    textElement.innerText = stringToPrint;
    textElement.id = 'checkbox-text';
    textElement.style.textAlign = 'center';
    textElement.style.marginTop = '15px';
    textElement.style.bottom = '5px';

    this.column.appendChild(textElement);
  }

  /**
   * Creates a new checkbox element on the page.
   * @return Checkbox that has been created. 
   */
  private createCheckbox(): HTMLInputElement {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.display = 'block';
    checkbox.style.margin = '10px auto';
    checkbox.checked = true;

    this.column.appendChild(checkbox);
    return checkbox;
  }

  /**
   * Updates the value of the Phase input element.
   * @param newValue New value that the input element will take.
   */
  updatePhaseInputElements(newValue: number): void {
    this.phaseInput.value = newValue.toFixed(2);
    this.phaseSlider.value = newValue.toFixed(2);
  }

  /**
   * Updates all the inputs and sliders fields given the parameters of a curve.
   * @param data Parameters of the curve that the inputs field will show.
   */
  updateInputs(data: CurveData): void {
    this.firstAngularFrequencyInput.value = String(data.firstAngularFrequency);
    this.firstAngularFrequencySlider.value = String(data.firstAngularFrequency);

    this.secondAngularFrequencyInput.value = String(data.secondAngularFrequency);
    this.secondAngularFrequencySlider.value = String(data.secondAngularFrequency);

    this.xAxisAmplitudeInput.value = String(data.xAmplitude);
    this.xAxisAmplitudeSlider.value = String(data.xAmplitude);

    this.yAxisAmplitudeInput.value = String(data.yAmplitude);
    this.yAxisAmplitudeSlider.value = String(data.yAmplitude);

    this.phaseInput.value = String(data.phase);
    this.phaseSlider.value = String(data.phase);
  }
}