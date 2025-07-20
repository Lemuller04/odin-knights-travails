import { Tree } from "./bst.js";

const Knight = () => {
  const errors = {
    missingArgument: `Missing function arguments. ( knightMoves([x, y], [x, y]) )`,
    notAnArray: `Arguments must be arrays`,
    wrongArrayLength: `Arrays must contain two numbers`,
    notANumber: `Array items must be numbers`,
    outOfBounds: `Numbers must be between 0 and 7 (board bounds)`,
  };

  function knightMoves(from, to) {
    if (!from || !to) {
      throw new Error(errors.missingArgument);
    }

    from = validatePositions(from);
    to = validatePositions(to);

    const queue = [];
  }

  function validatePositions(arr) {
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

export { Knight };
