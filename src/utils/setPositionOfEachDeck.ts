import { Ship } from "./types";

export const setPositionOfEachDeck = (ships: Ship[]) => {
  ships.forEach((ship) => {
    const positionOfEachDeck = new Map();
    let amountDeck = 1;

    if (ship.type === "huge") {
      amountDeck = 4;
    } else if (ship.type === "large") {
      amountDeck = 3;
    } else if (ship.type === "medium") {
      amountDeck = 2;
    } else if (ship.type === "small") {
      amountDeck = 1;
    }

    if (ship.direction) {
      let startY = ship.position.y;
      for (let i = 1; i <= amountDeck; i++) {
        positionOfEachDeck.set(i, { x: ship.position.x, y: startY });
        startY += 1;
      }
    } else {
      let startX = ship.position.x;
      for (let i = 1; i <= amountDeck; i++) {
        positionOfEachDeck.set(i, { x: startX, y: ship.position.y });
        startX += 1;
      }
    }

    ship.positionEachDeck = positionOfEachDeck;
  });
}
