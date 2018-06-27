class BinaryNode {
  constructor(key, value) {
    this.value = value;
    this.key = key;
    this.left = null;
    this.right = null;
  }
  left() {
    return this.left;
  }
  right() {
    return this.right;
  }
  // Cost: O(1)
  free() {
    this.left = null;
    this.right = null;
  }
}

class BinaryTreeNode {
  constructor() {
    this.root = null;
  }
  insert(key, value) {
    if (!Number.isInteger(key)) return;
    const newNode = new BinaryNode(key, value);
    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }
  // Cost: O(n)
  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    }
    else if (newNode.key === node.key) {
      node.value = newNode.value;
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }
  remove(key) {
    if (!Number.isInteger(key)) return;
    this.root = this.removeNode(this.root, key);
  }
  // Cost: O(n)
  removeNode(node, key) {
    if (node === null) return null;
    else if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      const aux = this.findMinimumNode(node.right);
      node.key = aux.key;

      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
  // Cost: O(1)
  empty() {
    this.root === null;
  }
  // Cost: O(1)
  clear() {
    this.root = null;
  }
  // Cost: O(n)
  findMinimumNode(node) {
    if (node.left === null) return node;
    else return this.findMinimumNode(node.left);
  }

  // Cost: O(n)
  inorder(node, fn) {
    if (node !== null) {
      this.inorder(node.left, fn);
      fn(node.value);
      this.inorder(node.right, fn);
    }
  }
  // Cost: O(n)
  preorder(node, fn) {
    if (node !== null) {
      fn(node.value);
      this.preorder(node.left, fn);
      this.preorder(node.right, fn);
    }
  }
  // Cost: O(n)
  postorder(node, fn) {
    if (node !== null) {
      this.postorder(node.left, fn);
      this.postorder(node.right, fn);
      fn(node.value);
    }
  }

  find(node, key) {
    if (node === null) return null;
    else if (key < node.key) return this.find(node.left, key);
    else if (key > node.key) return this.find(node.right, key);
    else return node;
  }
  
  levelOrder() {
    if (!this.root) return [];
    var array = [];
    search(this.root, 1);
  
    function search(node, level) {
      if (node) {
        if (array.length < level) {
          array.push([]);
        }
        var arr = array[level - 1];
        arr.push(node.value);
        search(node.left, level + 1);
        search(node.right, level + 1);
      } else {
        return;
      }
    }
  
    return array;
  }

  values() {
    if (!this.root) return [];
    var array = [];
    search(this.root, 1);
  
    function search(node, level) {
      if (node !== null) {
        array.push(node.value);
        search(node.left, level + 1);
        search(node.right, level + 1);
      } else {
        array.push("");
      }
    }
    return array;
  }
}

const tree = new BinaryTreeNode();
tree.insert(1, { a: "dwedwedw", b: "ihdeuihdwe" });
tree.insert(2, { g: "vne8e", w: "ihdeuihdwe" });
tree.insert(4, { dwedwe: "frjre03", dede_b: 443 });
tree.insert(5, { 7: "32fervc", "dedewd ew wed": "ihdeuihdwe" });
tree.insert(3, 34252);
tree.insert(6, { 23: "dweew", dedwe_swqs: 2 });
console.log(tree.search(tree.root, 4).value)
tree.insert(4, 3) //overwritting the key
console.log(tree.search(tree.root, 4).value)
tree.remove(2)
console.log(tree.search(tree.root, 2))
tree.preorder(tree.root, console.log);
