/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 09, 2026
 * @desc Class that displays the sum of areas of the displayed trapezoids.
 */

export class ResultDisplay {
  /** Text element containing the result. */
  private readonly resultText: HTMLParagraphElement;

  /**
   * Creates a paragraph element displaying the result.
   * @param container Container where the result will be displayed.
   */
  constructor(container: HTMLDivElement) {
    this.resultText = document.createElement('p') as HTMLParagraphElement;
    container.appendChild(this.resultText);
    this.updateSumOfAreas(0);
  }

  /**
   * Updates the text displaying the result.
   * @param newSum New result of the sum of areas of the trapezoids.
   */
  updateSumOfAreas(newSum: number) : void {
    this.resultText.innerText = `Sum of all Trapezium areas: ${newSum.toFixed(3)}`;
  }
}