const Node = (data = null) => ({ data, left: null, right: null });

const Tree = (initialArray = [], comparator) => {
  if (!comparator) comparator = (a, b) => a - b;

  let finalArray = prepare(initialArray);
  let treeRoot = buildTree(finalArray);

  function buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = Node(arr[mid]);
    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

    return root;
  }

  function insert(value, node = treeRoot) {
    if (!treeRoot) {
      treeRoot = Node(value);
      return;
    }
    if (comparator(value, node.data) === 0) return;
    if (comparator(value, node.data) < 0) {
      if (!node.left) {
        node.left = Node(value);
        return;
      }
      insert(value, node.left);
    } else {
      if (!node.right) {
        node.right = Node(value);
        return;
      }
      insert(value, node.right);
    }
    if (!isBalanced()) rebalance();
  }

  function deleteItem(value, node = treeRoot, parent = null) {
    if (!node) return;

    if (comparator(value, node.data) === 0) {
      // Case: node has no children
      if (!node.left && !node.right) {
        if (!parent) {
          treeRoot = null;
          return;
        }
        parent.left === node ? (parent.left = null) : (parent.right = null);
        return;
      }

      // Case: node has both child
      if (node.left && node.right) {
        let nextNode = node.right;
        let nextNodeParent = node;
        while (nextNode.left) {
          nextNodeParent = nextNode;
          nextNode = nextNode.left;
        }
        node.data = nextNode.data;

        deleteItem(nextNode.data, node.right, node);
        return;
      }

      // Cases: node has only one child
      if (node.left) {
        if (!parent) {
          treeRoot = node.left;
          return;
        }
        parent.left === node
          ? (parent.left = node.left)
          : (parent.right = node.left);
        return;
      }

      if (!parent) {
        treeRoot = node.right;
        return;
      }
      parent.left === node
        ? (parent.left = node.right)
        : (parent.right = node.right);
      return;
    }

    comparator(value, node.data) < 0
      ? deleteItem(value, node.left, node)
      : deleteItem(value, node.right, node);

    if (parent === null && !isBalanced()) rebalance();
  }

  function find(value, node = treeRoot) {
    if (!node) return null;
    if (comparator(value, node.data) === 0) return node;
    return comparator(value, node.data) < 0
      ? find(value, node.left)
      : find(value, node.right);
  }

  function levelOrderForEach(callback, node = null) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    node = node ? node : treeRoot;
    const queue = [node];
    while (queue.length > 0) {
      node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  function inOrderForEach(callback, node = treeRoot) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (!node) return;
    inOrderForEach(callback, node.left);
    callback(node);
    inOrderForEach(callback, node.right);
  }

  function postOrderForEach(callback, node = treeRoot) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (!node) return;
    postOrderForEach(callback, node.left);
    postOrderForEach(callback, node.right);
    callback(node);
  }

  function preOrderForEach(callback, node = treeRoot) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (!node) return;
    callback(node);
    preOrderForEach(callback, node.left);
    preOrderForEach(callback, node.right);
  }

  function height(value) {
    const node = find(value);
    if (!node) return null;

    return getHeight(node);
  }

  function depth(value, node = treeRoot, counter = 0) {
    if (!node) return null;
    if (node.data === value) return counter;
    counter++;
    return comparator(value, node.data) < 0
      ? depth(value, node.left, counter)
      : depth(value, node.right, counter);
  }

  function isBalanced(node = treeRoot) {
    if (!node) return true;

    if (Math.abs(getHeight(node.left) - getHeight(node.right)) > 1)
      return false;

    return isBalanced(node.left) && isBalanced(node.right);
  }

  function rebalance() {
    const arr = [];
    inOrderForEach((node) => arr.push(node.data));
    treeRoot = buildTree(arr);
  }

  function getHeight(n) {
    if (!n) return -1;
    return 1 + Math.max(getHeight(n.left), getHeight(n.right));
  }

  function prepare(arr) {
    let newArr = [...new Set(arr.map((v) => JSON.stringify(v)))].map(
      JSON.parse,
    );
    return newArr.sort(comparator);
  }

  const prettyPrint = (node = treeRoot, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(
      `${prefix}${isLeft ? "└── " : "┌── "}${JSON.stringify(node.data)}`,
    );
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    postOrderForEach,
    preOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
};

export default Tree;
