/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 09, 2026
 * @desc Interface that stores the elements needed to configure a cartesian plane.
 */

/**
 * Interface containing the parameters of a cartesian plane.
 */
export interface CartesianPlaneConfiguration {
  minimumXValue: number;
  maximumXValue: number;
  minimumYValue: number;
  maximumYValue: number;
  scaleXAxis: number;
  scaleYAxis: number;
}