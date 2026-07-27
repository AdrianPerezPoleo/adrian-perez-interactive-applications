/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 07, 2026
 * @desc CLass that models a mathematical expression.
 */

/*
 * Importamos los tipos para que TypeScript revise si hay errores mientras programamos. 
 * Al compilar, esta línea desaparece automáticamente y no causa problemas en el navegador.
 */
import type {MathJsInstance, EvalFunction} from 'mathjs';

/**
 * Importación del módulo ESM directamente mediante URL para que el navegador lo pueda encontrar. 
 */
// @ts-expect-error  THis line will be used in the navigator. 
import * as math_module from 'https://esm.sh/mathjs';

/**
 * Class that models a mathematical function.
 */
export class MathFunction {
  /**
   * Function that will be evaluated.
   */
  private mathFunction: EvalFunction;

  /**
   * Creates a new instance of a MathFunction object.
   * @param functionToStore String containing the function that will be evaluated.
   */
  constructor(functionToStore: string) {
    const math = math_module as MathJsInstance;
    this.mathFunction = math.compile(functionToStore);
  }

  /**
   * Method that evaluates a function with a given number and returns the result.
   * @return Result of the evaluation.
   */
  evaluate(userArgument: number): number {
    return this.mathFunction.evaluate({x: userArgument});
  }

  /**
   * Modifies the stored function, adding one new.
   * @param newExpression New expression to evaluate.
   */
  updateExpression(newExpression: string): void {
    const math = math_module as MathJsInstance;
    this.mathFunction = math.compile(newExpression);
  }
}
