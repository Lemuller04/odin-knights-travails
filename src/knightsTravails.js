import Tree from "./Tree.js";

const Knight = () => {
  const errors = {
    missingArgument: `Missing function arguments. ( knightMoves([x, y], [x, y]) )`,
    notAnArray: `Arguments must be arrays`,
    wrongArrayLength: `Arrays must contain two numbers`,
    notANumber: `Array items must be numbers`,
    outOfBounds: `Numbers must be between 0 and 7 (board bounds)`,
  };

  function comparator(a, b) {
    if (a.position[0] !== b.position[0]) return a.position[0] - b.position[0];
    return a.position[1] - b.position[1];
  }

  function knightMoves(from, to) {
    if (!from || !to) {
      throw new Error(errors.missingArgument);
    }

    from = validatePosition(from);
    to = validatePosition(to);

    const queue = [{ position: from, parent: null }];

    // Tree will store objects like: { position: [x, y], parent: [x, y] }
    const tree = Tree([], comparator);

    while (queue.length > 0) {
      let current = queue.shift();

      if (isSamePosition(current, to)) {
        const result = makeResult(current);

        console.log(`You made it in ${result.moves} moves! Here's your path:`);
        for (let i = result.path.length - 1; i >= 0; i--) {
          console.log(result.path[i]);
        }

        return result;
      }

      const possibilities = generateKnightMoves(
        current.position[0],
        current.position[1],
      );

      for (let possibilitie of possibilities) {
        try {
          validatePosition(possibilitie);
          const obj = {
            position: possibilitie,
            parent: current,
          };
          if (!tree.contains(obj)) {
            tree.insert(obj);
            queue.push(obj);
          }
        } catch {
          continue;
        }
      }
    }
  }

  function makeResult(current) {
    let counter = 0;
    const path = [];
    while (current.parent) {
      counter++;
      path.push(current.position);
      current = current.parent;
    }
    path.push(current.position);

    return {
      path: path,
      moves: counter,
    };
  }

  function generateKnightMoves(x, y) {
    return [
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x - 1, y + 2],
      [x - 1, y - 2],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
    ];
  }

  function isSamePosition(positionObj, coords) {
    return (
      positionObj.position[0] === coords[0] &&
      positionObj.position[1] === coords[1]
    );
  }

  function validatePosition(arr) {
    if (!Array.isArray(arr)) {
      throw new Error(errors.notAnArray + `. ( ${JSON.stringify(arr)} )`);
    }
    if (arr.length !== 2) {
      throw new Error(errors.wrongArrayLength + `. ( ${JSON.stringify(arr)} )`);
    }

    for (let item of arr) {
      if (isNaN(item) || typeof item !== "number") {
        throw new Error(errors.notANumber + `. ( ${JSON.stringify(item)} )`);
      }
    }

    arr = arr.map((item) => Math.floor(item));

    for (let item of arr) {
      if (item < 0 || item > 7) {
        throw new Error(errors.outOfBounds + `. ( ${JSON.stringify(item)} )`);
      }
    }
    return arr;
  }

  return {
    knightMoves,
  };
};

export default Knight;
