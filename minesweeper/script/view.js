import { CreateElement } from "./create.js";

export class View {
  constructor(arrField, rows, cols) {
    this.bombButtons = [];
    this.arrField = arrField;
    this.render(arrField, rows, cols);
  }

  render(arrField, rows, cols) {
    const element = new CreateElement();
    const title = element.create("h1", "title", document.body, "MINESWEEPER");
    const wrapper = element.create("div", "wrapper", document.body);
    const reButton = element.create(
      "button",
      "restart",
      document.body,
      "RESTART"
    );

    const soundSwitch = element.create("button", "switch", document.body, "ON");

    const clickSound = new Audio("./assets/sounds/click.mp3");
    const restartSound = new Audio("./assets/sounds/restart.mp3");
    const endGameSound = new Audio("./assets/sounds/endgame.mp3");
    const winGameSound = new Audio("./assets/sounds/victory.mp3");

    let soundEnabled = true;

    soundSwitch.onclick = () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        restartSound.play();
        clickSound.play();
        endGameSound.play();
      } else {
        restartSound.pause();
        clickSound.pause();
        endGameSound.pause();
      }
      soundSwitch.textContent = soundEnabled ? "ON" : "OFF";
    };

    reButton.onclick = () => {
      restartSound.play();
      wrapper.remove();
      title.remove();
      reButton.remove();
      soundSwitch.remove();
      this.render(this.arrField, 10, 10);
    };

    arrField.forEach((row, el) => {
      row.forEach((cell, index) => {
        const button = element.create("button", "cell", wrapper, " ");
        if (cell.isBomb) {
          this.bombButtons.push(button);
        }

        button.onclick = () => {
          clickSound.play();
          this.clickCell(
            button,
            cell.isBomb,
            cell.isRevealed,
            cell.neighborBombCount,
            el,
            index,
            rows,
            cols,
            wrapper,
            endGameSound,
            winGameSound
          );
        };
        button.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          if (!button.classList.contains("revealed")) {
            button.classList.toggle("flagged");
          }
        });
      });
    });
  }

  clickCell(
    button,
    isBomb,
    isRevealed,
    neighborBombCount,
    el,
    index,
    rows,
    cols,
    wrapper,
    endGameSound,
    winGameSound
  ) {
    const buttons = wrapper.getElementsByTagName("button");

    if (isBomb) {
      this.bombButtons.forEach((button) => {
        button.classList.add("bomb");
      });
      alert("Game over!");
      endGameSound.play();
      this.endGame(wrapper);
    } else if (!isRevealed) {
      isRevealed = true;
      button.classList.add("revealed");
      if (neighborBombCount > 0) {
        if (neighborBombCount == 1) {
          button.classList.add("color1");
        } else if (neighborBombCount == 2) {
          button.classList.add("color2");
        } else if (neighborBombCount == 3) {
          button.classList.add("color3");
        } else if (neighborBombCount == 4) {
          button.classList.add("color4");
        }
        button.textContent = neighborBombCount;
      }
      if (isRevealed || neighborBombCount == 0) {
        let arr = this.getNeighborCells(el, index, rows, cols);
      }

      let allButtonsRevealed = true;
      for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].classList.contains("revealed")) {
          allButtonsRevealed = false;
          break;
        }
      }

      if (allButtonsRevealed) {
        alert("Congratulations, you won!");
        winGameSound.play();
      }
    }
  }

  getNeighborCells(el, index, rows, cols) {
    const neighborCells = [];
    for (let r = Math.max(0, el - 1); r <= Math.min(el + 1, rows - 1); r++) {
      for (
        let c = Math.max(0, index - 1);
        c <= Math.min(index + 1, cols - 1);
        c++
      ) {
        if (r !== el || c !== index) {
          neighborCells.push([r, c]);
        }
      }
    }
    if (index < cols - 1) {
      neighborCells.push([el, index + 1]);
    }
    neighborCells.splice(4, 1);
    return neighborCells;
  }

  endGame(wrapper) {
    const buttons = wrapper.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
}
