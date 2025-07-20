if (process.argv.length != 2) {
  throw new Error("Wrong usage. Use: 'node tests.js'");
}

const run = async () => {
  const { Tree } = await import("./bst.js");

  console.log(":D");
};

run();
