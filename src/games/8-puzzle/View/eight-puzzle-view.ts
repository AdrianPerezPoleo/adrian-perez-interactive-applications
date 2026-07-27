/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * @author Adrián Pérez Poleo
 * @since May 12, 2026
 * @desc Class that models the application view.
 */

import {Event} from '../event';

const IMAGES_BASE_PATH =
  `${import.meta.env.BASE_URL}images/puzzle/1-8Puzzle-Tiggre-imgs/`;

export class EightPuzzleView {
  private readonly board: HTMLDivElement;
  private readonly cells: HTMLDivElement[] = [];
  /** Map containing the piece index and its image. */
  private readonly imagesMapping: Map<number, string> = new Map();
  /** Map containing the piece index and its numbered image. */
  private readonly numberedImagesMapping: Map<number, string> = new Map();

  /** Checkbox indicating if the numbers must be displayed. */
  private readonly numbersCheckbox: HTMLInputElement;
  private readonly shuffleButton: HTMLButtonElement;
  private readonly solveButton: HTMLButtonElement;

  private readonly shuffleEvent = new Event<void>();
  private readonly movePieceEvent = new Event<number>();
  private readonly displayNumbersEvent = new Event<boolean>();
  private readonly solveEvent = new Event<void>();

  /** Boolean that indicates if the numbers must be displayed. */
  private showNumbers: boolean = false;

  constructor() {
    this.numbersCheckbox = document.getElementById('checkbox') as HTMLInputElement;
    this.shuffleButton = document.getElementById('shuffle') as HTMLButtonElement;
    this.solveButton = document.getElementById('solve') as HTMLButtonElement;

    this.board = document.getElementById('board') as HTMLDivElement;

    const fixedGrid = document.createElement('div');
    fixedGrid.classList.add('fixed-grid', 'has-3-cols');

    fixedGrid.style.width = '100%';
    fixedGrid.style.maxWidth = '800px';
    fixedGrid.style.margin = '0 auto';

    const gridInner = document.createElement('div');
    gridInner.classList.add('grid', 'is-gapless');

    for (let i = 0; i < 9; ++i) {
      const cell = this.createCell();
      this.cells.push(cell);
      gridInner.appendChild(cell);
    }

    fixedGrid.appendChild(gridInner);
    this.board.appendChild(fixedGrid);

    this.initializeImageMapping();
    this.initializeNumberedImageMapping();
    this.setListeners();
  }

  /**
   * Displays the board.
   * @param pieces 
   */
  displayBoard(pieces: number[]) {
    if (this.showNumbers) {
      this.displayNumbers(pieces);
    } else {
      this.displayPieces(pieces);
    }
  }

  /**
   * Displays the board given the order of the pieces.
   * @param pieces Order of the stored pieces.
   */
  private displayPieces(pieces: number[]): void {
    pieces.forEach((pieceNumber, index) => {
      const cell = this.cells[index];
      cell.innerText = '';
      cell.className = 'cell';
 
      if (pieceNumber === 0) {
        cell.style.backgroundImage = 'none';
        cell.classList.add('has-background-ull-purple');
      } else {
        const imagePath = this.imagesMapping.get(pieceNumber)!;
        cell.style.backgroundImage = `url('${imagePath}')`;
        cell.style.backgroundSize = 'cover';
        cell.style.backgroundPosition = 'center';
        cell.dataset['value'] = String(pieceNumber);
      }
    });
  }

  /**
   * Displays the numeric pieces in the game.
   * @param pieces Index of the pieces to be printed.
   */
  private displayNumbers(pieces: number[]): void {
    pieces.forEach((pieceNumber, index) => {
      const cell = this.cells[index];
      cell.innerText = '';
      cell.className = 'cell';
 
      if (pieceNumber === 0) {
        cell.style.backgroundImage = 'none';
        cell.classList.add('has-background-ull-purple');
      } else {
        const imagePath = this.numberedImagesMapping.get(pieceNumber)!;
        cell.style.backgroundImage = `url('${imagePath}')`;
        cell.style.backgroundSize = 'cover';
        cell.style.backgroundPosition = 'center';
        cell.dataset['value'] = String(pieceNumber);
      }
    });
  }

  /**
   * Adds a alistener to the display numbers event
   * @param callback new listener..
   */
  addDisplayNumbersListener(callback: (checked: boolean) => void): void {
    this.displayNumbersEvent.addListener(callback);
  }

  /**
   * Adds a listener to the shuffle event.
   * @param callback New listener.
   */
  addShuffleEventListener(callback: () => void): void {
    this.shuffleEvent.addListener(callback);
  }

  /**
   * Adds a litener to the move event.
   * @param callback New listener.
   */
  addMovePieceListener(callback: (pieceIndex: number) => void): void  {
    this.movePieceEvent.addListener(callback);
  }

  /***
   * Adds a listener to the solve event.
   * @param callback new listener.
   */
  addSolveListener(callback: () => void): void {
    this.solveEvent.addListener(callback);
  }

  /**
   * Chenges the configuration.
   * @param show True if the numbers must be shown. False otherwise.
   */
  displayNumbersOnScreen(show: boolean): void {
    this.showNumbers = show;
  }

  /**
   * Sets the listeners of the application.
   */
  private setListeners(): void {
    this.numbersCheckbox.addEventListener('click', () => {
      this.displayNumbersEvent.trigger(this.numbersCheckbox.checked);
    });
    this.shuffleButton.addEventListener('click', () => {
      this.shuffleEvent.trigger();
    });

    this.cells.forEach((cell, index) => {
      cell.onclick = () => {
        this.movePieceEvent.trigger(index);
      };
    });

    this.solveButton.addEventListener('click', () => {
      this.solveEvent.trigger();
    });
  }

  /**
   * Creates a new cell in the board.
   * @return New cell that has been created. 
   */
  private createCell(): HTMLDivElement {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    cell.style.minHeight = '150px';
    cell.style.aspectRatio = '1/1';
    cell.style.cursor = 'pointer';

    cell.innerText = 'Cell';
    return cell;
  }

  /**
   * Initializes the map where each number is connected to its image.
   */
  private initializeImageMapping(): void {
    for (let i = 1; i <= 8; i++) {
      this.imagesMapping.set(i, `${IMAGES_BASE_PATH}Tigre${i}-H.png`);
    }
    this.imagesMapping.set(0, '');
  }

  /**
   * Initializes the map that contains the link of the numbered images.
   */
  private initializeNumberedImageMapping(): void {
    for (let i = 1; i <= 8; i++) {
      this.numberedImagesMapping.set(i, `${IMAGES_BASE_PATH}Tigre${i}.png`);
    }
    this.numberedImagesMapping.set(0, '');
  }
}