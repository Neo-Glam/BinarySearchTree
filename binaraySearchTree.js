class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  isEmpty() {
    return this.root === null;
  }
  insert(value) {
    const node = new Node(value);
    if (this.isEmpty()) this.root = node;
    else {
      this.insertNode(this.root, node);
    }
  }
  insertNode(root, node) {
    if (node.value < root.value) {
      if (root.leftChild === null) root.leftChild = node;
      else this.insertNode(root.leftChild, node);
    } else {
      if (node.value > root.value) {
        if (root.rightChild === null) root.rightChild = node;
        else this.insertNode(root.rightChild, node);
      }
    }
  }
  buildTree(array) {
    if (array.length === 0) return null;

    const uniqueArray = [...new Set(array)];
    const sortedArray = uniqueArray.sort((a,b) => a - b);
    const mid = Math.floor(sortedArray.length / 2); 
    const head = new Node(sortedArray[mid]);

    const left = sortedArray.slice(0, mid);
    const right = sortedArray.slice(mid + 1);

    head.leftChild = this.buildTree(left);
    head.rightChild = this.buildTree(right);

    return head;
  }
  search(root, value) {
    if (!root) return null;
    else {
      if (value === root.value) return root;
      else if (value < root.value) return this.search(root.leftChild, value);
      else return this.search(root.rightChild, value);
    }
  }
  find(value) {
    if (!this.root) return null;
    else return this.search(this.root, value);
  }
  levelOrder() {
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let current = queue.shift();
      console.log(current.value);
      if (current.leftChild) queue.push(current.leftChild);
      if (current.rightChild) queue.push(current.rightChild);
    }
  }
  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.leftChild);
      this.preOrder(root.rightChild);
    }
  }
  inOrder(root) {
    if (root) {
      this.inOrder(root.leftChild);
      console.log(root.value);
      this.inOrder(root.rightChild);
    }
  }
  postOrder(root) {
    if (root) {
      this.postOrder(root.leftChild);
      this.postOrder(root.rightChild);
      console.log(root.value);
    }
  }
  min(root) {
    if (!root.leftChild) return root.value;
    else return this.min(root.leftChild);
  }
  max(root) {
    if (!root.rightChild) return root.value;
    else return this.max(root.rightChild);
  }
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }
  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (root.value > value)
      root.leftChild = this.deleteNode(root.leftChild, value);
    else if (root.value < value)
      root.rightChild = this.deleteNode(root.rightChild, value);
    else {
      if (!root.leftChild && !root.rightChild) return null;
      else if (!root.leftChild) return root.rightChild;
      else if (!root.rightChild) return root.leftChild;
      root.value = this.min(root.rightChild);
      root.rightChild = this.deleteNode(root.rightChild, root.value);
    }
    return root;
  }
  height(value) {
    const node = this.find(value);
    if (!node) return null;
    else return this.nodeHeight(node);
  }
  nodeHeight(node) {
    if (!node) return -1;
    const leftHeight = this.nodeHeight(node.leftChild);
    const rightHeight = this.nodeHeight(node.rightChild);
    return 1 + Math.max(leftHeight, rightHeight);
  }
  depth(value) {
    return this.nodeDepth(this.root, value);
  }
  nodeDepth(root, value) {
    let depht = 0;
    let current = root;
    while (current) {
      if (current.value === value) return depht;
      else if (current.value > value) current = current.leftChild;
      else current = current.rightChild;
      depht += 1;
    }
    return null;
  }
  isBalanced(root) {
    if (root === null) return true;
    const leftHeight = this.nodeHeight(root.leftChild);
    const rightHeight = this.nodeHeight(root.rightChild);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    else
      return (
        this.isBalanced(root.leftChild) && this.isBalanced(root.rightChild)
      );
  }
  rebalance() {
    if (this.isBalanced(this.root)) return "it's already balanced";
    else {
      const treeArrayData = [];
      this.inOrderArray(this.root, treeArrayData);
      this.root = this.buildTree(treeArrayData);
    }
  }
  inOrderArray(root, array) {
    if (root) {
      this.inOrderArray(root.leftChild, array);
      array.push(root.value);
      this.inOrderArray(root.rightChild, array);
    }
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(7);
bst.insert(18);
bst.insert(46);
bst.insert(37);
bst.insert(29);
bst.insert(20);
bst.insert(10);
bst.insert(7);



