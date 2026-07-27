/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 12, 2026
 * @desc Class that models the application model.
 */

/**
 * Class that models the puzzle image.
 */
export class EightPuzzleModel {
  /** Represents the state of the pieces in the puzzle. */
  private piecesSequence: number[];

  /**
   * Creates a new instance of the model.
   */
  constructor() {
    this.piecesSequence = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  }

  /**
   * Returns the sequence of pieces currently played.
   * @return Pieces currently played.
   */
  getPiecesSequence(): number[] {
    return this.piecesSequence;
  }

  /**
   * Moves the piece if it's next to the empty slot.
   * @param clickedIndex Index of the cell clicked by the user.
   * @return True if the movement could be done.
   */
  movePiece(clickedIndex: number): boolean {
    const emptyIndex = this.piecesSequence.indexOf(0);
    if (this.canMove(clickedIndex, emptyIndex)) {
      this.swap(clickedIndex, emptyIndex);
      return true;
    }
    return false;
  }

  /**
   * Checks if the clicked piece is adjacent to the empty slot.
   * @param clicked Index of the clicked piece.
   * @param empty Index of the empty slot.
   * @return True if the move can be done.
   */
  private canMove(clicked: number, empty: number): boolean {
    const clickedRow = Math.floor(clicked / 3);
    const clickedCol = clicked % 3;
    
    const emptyRow = Math.floor(empty / 3);
    const emptyCol = empty % 3;

    const rowDifference = Math.abs(clickedRow - emptyRow);
    const colDifference = Math.abs(clickedCol - emptyCol);

    return (rowDifference + colDifference) === 1;
  }

  /**
   * Swaps two elements in the array.
   */
  private swap(indexA: number, indexB: number): void {
    [this.piecesSequence[indexA], this.piecesSequence[indexB]] = [this.piecesSequence[indexB], this.piecesSequence[indexA]];
  }

  /**
   * Shuffles the deck using the Fisher-Yates Sorting Algorithm
   */
  shuffle(): void {
    for (let i = this.piecesSequence.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.piecesSequence[i], this.piecesSequence[j]] = [this.piecesSequence[j], this.piecesSequence[i]];
    }
  }

  /**
   * Solves the puzzle.
   */
  solve(): void {
    this.piecesSequence = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  }
}