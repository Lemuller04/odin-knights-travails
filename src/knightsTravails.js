import Tree from "./Tree.js";

const Knight = () => {
  const directions = [
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
  ];

  function isValidPosition([x, y]) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  function knightMoves(start, end) {
    if (!Array.isArray(start) || !Array.isArray(end)) {
      throw new Error("Both arguments must be arrays of [x,y].");
    }
    if (!isValidPosition(start) || !isValidPosition(end)) {
      throw new Error("Both positions must be on an 8x8 board (0-7).");
    }

    const queue = [{ position: start, parent: null }];
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
      const current = queue.shift();
      const [x, y] = current.position;

      if (x === end[0] && y === end[1]) {
        const path = [];
        let node = current;
        while (node) {
          path.push(node.position);
          node = node.parent;
        }
        path.reverse();

        console.log(
          `You made it in ${path.length - 1} moves! Here's your path:`,
        );
        path.forEach((step) => console.log(step));

        return { moves: path.length - 1, path };
      }

      for (const [dx, dy] of directions) {
        const nextPos = [x + dx, y + dy];
        const key = nextPos.toString();
        if (isValidPosition(nextPos) && !visited.has(key)) {
          visited.add(key);
          queue.push({ position: nextPos, parent: current });
        }
      }
    }
  }

  return {
    knightMoves,
  };
};

export default Knight;
