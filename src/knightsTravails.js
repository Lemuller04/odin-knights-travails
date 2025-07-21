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

    from = validatePosition(from);
    to = validatePosition(to);

    const tree = Tree();
    const queue = [from];

    while (queue.length > 0) {
      let current = queue.shift();
      tree.insert(current);

      let possibilities = [
        [current[0] - 2, current[1] - 1],
        [current[0] - 2, current[1] + 1],
        [current[0] - 1, current[1] - 2],
        [current[0] - 1, current[1] + 2],
        [current[0] + 1, current[1] - 2],
        [current[0] + 1, current[1] + 2],
        [current[0] + 2, current[1] - 1],
        [current[0] + 2, current[1] + 1],
      ];

      for (let possibilitie of possibilities) {
        try {
          validatePosition(possibilitie);
          if (!tree.find(possibilitie)) {
            queue.push(possibilitie);
          }
        } catch {
          continue;
        }
      }
    }

    tree.prettyPrint();
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
