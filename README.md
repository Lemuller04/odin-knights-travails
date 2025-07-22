# odin-knights-travails

An educational Javascript project implementing a knight's shortest-path finder on an 8x8 board. Built as part of The Odin Project's Javascript curriculum, this exercise applies breadth-first search (BFS) to graph traversal in a grid.

## Overview

This project expose a single function, ```knightMoves(start, end)```, which returns:

- ```moves```: the minimum number of knight moves between two coordinates.
- ```path```: an array of ```[x, y]``` pairs mapping each step.

Because every board square is treated as a graph node and each legal knight move as an adge, BFS guarantees the shortest route.

## Instalation

```bash
git clone https://github.com/Lemuller04/odin-knights-travails.git
cd odin-knights-travails
```

No additional packages are needed. Ensure you have [Node.js](https://nodejs.org/) installed.

## Usage

Import the module and call ```knightMoves```:

```Javascript
import Knight from "./src/knightsTravails.js";
const knight = Knight();

// Find the shortest path from [0, 0] to [7, 7]
const result = knight.knightMoves([0, 0], [7, 7]);

console.log(`Moves: ${result.moves}`);
console.log(`Path: ${result.path}`);
````

## Running Tests

A simple test suite verifies functionality and edge-case handling. From the project root:

```bash
npm run test
```

This will execute ```node test/tests.js``` and report pass/fail status in the console.

## Algorithm

- Represent positions as ```[x, y]``` pairs on a zero-indexed 8x8 grid.
- BFS queue: Enqueue the starting node, tracking its parent for path reconstruction.
- Visited set: Prevent revisiting squares and infinite loops.
- Traverse neighbors: At each step, generate up to eight valid knight moves, enqueue unseen positions, and mark them visited.
- Reconstruct path: Once the target is dequeued, backtracking through parent references to build the full route.

## Project Structure

```bash
odin-knights-travails/
├─ package.json          # Metadata & test script
├─ README.md             # This document
├─ src/
│  └─ knightsTravails.js # Core BFS implementation
└─ test/
   └─ tests.js           # Basic test suite
```
