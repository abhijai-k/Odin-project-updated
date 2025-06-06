class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  deleteItem(value, root = this.root) {
    if (!root) return root;
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let successor = root.right;
      while (successor.left) successor = successor.left;
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (!root || root.data === value) return root;
    return value < root.data ? this.find(value, root.left) : this.find(value, root.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error('Callback is required.');
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback is required.');
    if (!node) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback is required.');
    if (!node) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback is required.');
    if (!node) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this._height(node);
  }

  _height(node) {
    if (!node) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  depth(value, node = this.root, depth = 0) {
    if (!node) return null;
    if (node.data === value) return depth;
    return value < node.data
      ? this.depth(value, node.left, depth + 1)
      : this.depth(value, node.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const lh = this._height(node.left);
    const rh = this._height(node.right);
    if (Math.abs(lh - rh) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = [];
    this.inOrder((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const arr = randomArray();
const bst = new Tree(arr);
console.log('Initial Tree:');
prettyPrint(bst.root);

console.log('Is balanced?', bst.isBalanced());

console.log('Level-order:');
bst.levelOrder((node) => console.log(node.data));

console.log('Pre-order:');
bst.preOrder((node) => console.log(node.data));

console.log('In-order:');
bst.inOrder((node) => console.log(node.data));

console.log('Post-order:');
bst.postOrder((node) => console.log(node.data));

bst.insert(101);
bst.insert(102);
bst.insert(103);
bst.insert(104);

console.log('After unbalancing:');
prettyPrint(bst.root);
console.log('Is balanced?', bst.isBalanced());

bst.rebalance();
console.log('After rebalancing:');
prettyPrint(bst.root);
console.log('Is balanced?', bst.isBalanced());
