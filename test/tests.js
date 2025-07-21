if (process.argv.length != 2) {
  throw new Error("Wrong usage. Use: 'node tests.js'");
}

import { Knight } from "../src/knightsTravails.js";

// Write tests below:

const knight = Knight();
knight.knightMoves([0, 0], [7, 7]);
