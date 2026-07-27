/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 12, 2026
 * @desc Class that models the application controller.
 */

import {EightPuzzleModel} from '../Model/eight-puzzle-model';
import {EightPuzzleView} from '../View/eight-puzzle-view';

/**
 * Class that models the puzzle controller.
 */
export class EightPuzzleController {
  constructor(private readonly model: EightPuzzleModel,
              private readonly view: EightPuzzleView) { 
    this.view.displayBoard(this.model.getPiecesSequence());

    this.view.addDisplayNumbersListener((checked) => this.handleDisplaynumbers(checked));
    this.view.addShuffleEventListener(() => this.handleShuffleEvent());
    view.addMovePieceListener((pieceIndex) => this.handleMovePiece(pieceIndex));
    this.view.addSolveListener(() => this.handleSolve());
  }

  /**
   * Handles the number displaying in the puzzle.
   * @param checked 
   */
  handleDisplaynumbers(checked: boolean) {
    this.view.displayNumbersOnScreen(checked);
    this.view.displayBoard  (this.model.getPiecesSequence());
  }

  /**
   * handles the Shuffle event.
   */
  handleShuffleEvent() {
    this.model.shuffle();
    this.view.displayBoard(this.model.getPiecesSequence());
  }

  /**
   * Handles the Move Piece event.
   * @param pieceIndex 
   */
  handleMovePiece(pieceIndex: number): void {
    console.log('Moviendo el ', pieceIndex);
    this.model.movePiece(pieceIndex);
    this.view.displayBoard(this.model.getPiecesSequence());
  }

  /**
   * Handles how the puzzle must be solved.
   */
  handleSolve(): void {
    this.model.solve();
    this.view.displayBoard(this.model.getPiecesSequence());
  }
}