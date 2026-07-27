/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 09, 2026
 * @desc Class that displays teh action buttons and receives the user events.
 */

import {Event} from '../event';
import {TrapezoidalRuleData} from '../Model/trapezoidal-rule-data';

/** Class that displays teh action buttons and receives the user events. */
export class InputHandler {
  /** Input fields where the expression must be introduced. */
  private readonly expressionInputField: HTMLInputElement;
  /** Input field where the number of trapezoids is introduced. */
  private readonly numberOfTrapezoidsInputField: HTMLInputElement;
  /** Input field that contains the first value to be evaluated. */
  private readonly startingValueInputField: HTMLInputElement;
  /** Input fields with the last value to evaluate. */
  private readonly endingValueInputField: HTMLInputElement;
  /** Button cliecked when the function must be updated. */
  private readonly updateButton: HTMLButtonElement;
  /** Event triggered when the user interacts with the application. */
  private readonly updateFunctionEvent = new Event<TrapezoidalRuleData>();

  /**
   * Creates a new instance of the Input Handler
   * @param container Container where the handler will be displayed.
   */
  constructor(container: HTMLDivElement) {
    this.expressionInputField = this.createInputField(container, 'Expression', 'x^2 + 1');
    this.numberOfTrapezoidsInputField = this.createInputField(container, 'Number Of Trapezoids', 4);
    this.startingValueInputField = this.createInputField(container, 'Start', 0);
    this.endingValueInputField = this.createInputField(container, 'End', 2);
    this.updateButton = this.createButton(container, 'Update');

    this.setListeners();
  }

  /**
   * Adds a listener to the Update Function event.
   * @param callback New listener.
   */
  addUpdateFunctionListener(callback: (data: TrapezoidalRuleData) => void) {
    this.updateFunctionEvent.addListener(callback);
  }

  /**
   * Creates an input field.
   * @param parentContainer Div where the input field will be displayed.
   * @param title Title that will be on the input field.
   * @param defaultValue Default value the input field will have.
   * @return Input fields that has been created.
   */
  private createInputField(parentContainer: HTMLElement, title: string, defaultValue: string | number): HTMLInputElement {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('field', 'mb-4');

    const label = document.createElement('label');
    label.classList.add('label');
    label.textContent = title;

    const controlDiv = document.createElement('div');
    controlDiv.classList.add('control');

    const input = document.createElement('input');
    input.classList.add('input');
    input.value = defaultValue.toString();

    controlDiv.appendChild(input);
    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(controlDiv);
    parentContainer.appendChild(fieldWrapper);
    return input;
  }

  /**
   * Creates a new button in the aplication interface.
   * @param parentContainer Container where the button will be displayed.
   * @param text Text that will be inside the button.
   * @return Button element that has been created. 
   */
  private createButton(parentContainer: HTMLElement, text: string): HTMLButtonElement {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('field', 'mt-4', 'has-text-centered'); 

    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('has-background-white', 'button');

    buttonWrapper.appendChild(button);
    parentContainer.appendChild(buttonWrapper);
    return button;
  }

  /**
   * Triggers the Update Function event after collecting the information from the input fields.
   */
  triggerUpdateEvent(): void {
    const newInputData: TrapezoidalRuleData = this.getInputInformation();
    this.updateFunctionEvent.trigger(newInputData);
  }

  /**
   * Sets the listeners in the interactive DOM elements.
   */
  private setListeners(): void {
    this.startingValueInputField.addEventListener('change', () => this.triggerUpdateEvent());
    this.endingValueInputField.addEventListener('change', () => this.triggerUpdateEvent());
    this.numberOfTrapezoidsInputField.addEventListener('change', () => this.triggerUpdateEvent());

    this.updateButton.addEventListener('click',  () => this.triggerUpdateEvent());
  }

  /**
   * Collectes the information in the input fields and returns an object.
   * @return Object containing the information in the input fields. 
   */
  private getInputInformation(): TrapezoidalRuleData {
    return {
      functionExpression: this.expressionInputField.value,
      startingXValue: Number(this.startingValueInputField.value),
      endingXValue: Number(this.endingValueInputField.value),
      intervals: Number(this.numberOfTrapezoidsInputField.value) 
    };
  }
}