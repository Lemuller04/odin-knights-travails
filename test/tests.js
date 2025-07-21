import Knight from "../src/knightsTravails.js";

const knight = Knight();

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(
      `❌ FAIL: ${message}\n  Expected: ${expected}, but got: ${actual}`,
    );
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

function assertArrayEqual(actual, expected, message) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`❌ FAIL: ${message}\n  Expected: ${e}, but got: ${a}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

function runTests() {
  console.log("\n🧪 Running Knight’s Travails Tests:\n");

  // Test 1: Basic move (one move away)
  let result = knight.knightMoves([0, 0], [1, 2]);
  assertEqual(result.moves, 1, "Should find 1 move from [0,0] to [1,2]");

  // Test 2: Same position (zero moves)
  result = knight.knightMoves([3, 3], [3, 3]);
  assertEqual(result.moves, 0, "Should find 0 moves when start == end");

  // Test 3: Longer path
  result = knight.knightMoves([0, 0], [7, 7]);
  assertEqual(result.moves, 6, "Should find 6 moves from [0,0] to [7,7]");

  // Test 4: Path correctness (start and end match)
  assertArrayEqual(
    result.path[0],
    [7, 7],
    "Path should start at the target position",
  );
  assertArrayEqual(
    result.path[result.path.length - 1],
    [0, 0],
    "Path should end at the starting position",
  );

  // Test 5: Edge of board
  result = knight.knightMoves([0, 0], [0, 7]);
  assertEqual(result.moves > 0, true, "Should find a path to far edge");

  // Test 6: Invalid input (not arrays)
  try {
    knight.knightMoves("notArray", [0, 0]);
    console.error("❌ FAIL: Should throw error for non-array input");
    process.exit(1);
  } catch {
    console.log("✅ PASS: Throws error for non-array input");
  }

  // Test 7: Invalid input (out of bounds)
  try {
    knight.knightMoves([0, 0], [8, 8]);
    console.error("❌ FAIL: Should throw error for out-of-bounds input");
    process.exit(1);
  } catch {
    console.log("✅ PASS: Throws error for out-of-bounds input");
  }

  // Test 8: Invalid input (missing argument)
  try {
    knight.knightMoves([0, 0]);
    console.error("❌ FAIL: Should throw error for missing arguments");
    process.exit(1);
  } catch {
    console.log("✅ PASS: Throws error for missing arguments");
  }

  console.log("\n🎉 All tests passed successfully.\n");
}

runTests();
