export class Model {
  constructor(rows, cols, bombCount) {
    this.arrField = null;
    this.generateArray(rows, cols, bombCount);
  }

  generateArray(rows, cols, bombCount) {
    this.arrField = [];
    for (let i = 0; i < rows; i++) {
      this.arrField[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        this.arrField[i][j] = {
          isBomb: false,
          isRevealed: false,
          neighborBombCount: 0,
        };
      }
    }
    this.generateBombs(bombCount);
    this.countNeighborBombs(rows, cols);
  }

  countNeighborBombs(rows, cols) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0;
        const isBomb = this.arrField[i][j].isBomb;
        if (!isBomb) {
          for (
            let r = Math.max(0, i - 1);
            r <= Math.min(rows - 1, i + 1);
            r++
          ) {
            for (
              let c = Math.max(0, j - 1);
              c <= Math.min(cols - 1, j + 1);
              c++
            ) {
              if (r === i && c === j) {
                continue;
              }
              if (this.arrField[r][c].isBomb) {
                count++;
              }
            }
          }
        }
        this.arrField[i][j].neighborBombCount = count;
      }
    }
  }

  generateBombs(bombCount) {
    let bombsPlaced = 0;
    while (bombsPlaced < bombCount) {
      const row = Math.floor(Math.random() * this.arrField.length);
      const col = Math.floor(Math.random() * this.arrField[0].length);
      if (!this.arrField[row][col].isBomb) {
        this.arrField[row][col].isBomb = true;
        bombsPlaced++;
      }
    }
  }
}
