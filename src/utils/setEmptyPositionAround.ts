export const setEmptyPositionAround = (killedShip: { x: number, y: number, direction: boolean }[]) => {

  if (killedShip[0]!.direction) {
    killedShip.sort((a, b) => a.y - b.y)
  } else {
    killedShip.sort((a, b) => a.x - b.x)
  };

  const emptyCells: { x: number, y: number }[] = [];

  killedShip.forEach((position, ind, arr) => {
    let x = position.x;
    let y = position.y;
    if (arr.length === 1) {
      emptyCells.push({ x: x - 1, y: y - 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y }, { x: x + 1, y: y },
        { x: x - 1, y: y + 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y + 1 });
    } else {
      if (position.direction) {
        if (ind === 0) {
          emptyCells.push({ x: x - 1, y: y - 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y }, { x: x + 1, y: y })
        } else if (ind === arr.length - 1) {
          emptyCells.push({ x: x - 1, y: y + 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y + 1 }, { x: x - 1, y: y }, { x: x + 1, y: y });
        } else {
          emptyCells.push({ x: x - 1, y: y }, { x: x + 1, y: y });
        }
      } else {
        if (ind === 0) {
          emptyCells.push({ x: x - 1, y: y - 1 }, { x: x - 1, y: y }, { x: x - 1, y: y + 1 }, { x: x, y: y - 1 }, { x: x, y: y + 1 });
        } else if (ind === arr.length - 1) {
          emptyCells.push({ x: x + 1, y: y - 1 }, { x: x + 1, y: y }, { x: x + 1, y: y + 1 }, { x: x, y: y - 1 }, { x: x, y: y + 1 });
        } else {
          emptyCells.push({ x: arr[ind]!.x, y: y - 1 }, { x: arr[ind]!.x, y: y + 1 });
        }
      }
    }
  })
  return emptyCells;
}
