// binary-search-tree.js


class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root; // can be null at start
  }


  
  /** insert(val): iterative insert. returns the tree (this). */
  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    let cur = this.root;
    while (cur) {
      if (val < cur.val) {
        if (!cur.left) { cur.left = new Node(val); return this; }
        cur = cur.left;
      } else if (val > cur.val) {
        if (!cur.right) { cur.right = new Node(val); return this; }
        cur = cur.right;
      } else {
        // duplicate: keep it simple -> ignore
        return this;
      }
    }
    return this;
  }

  /** insertRecursively(val): recursive insert. returns the tree. */
  insertRecursively(val) {
    const go = (node) => {
      if (!node) return new Node(val);
      if (val < node.val) node.left = go(node.left);
      else if (val > node.val) node.right = go(node.right);
      else return node; // duplicate, do nothing
      return node;
    };
    this.root = go(this.root);
    return this;
  }

  /** find(val): iterative find. returns the node or undefined. */
  find(val) {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return cur;
      cur = val < cur.val ? cur.left : cur.right;
    }
    return undefined;
  }

  /** findRecursively(val): recursive find. */
  findRecursively(val) {
    const go = (node) => {
      if (!node) return undefined;
      if (val === node.val) return node;
      return val < node.val ? go(node.left) : go(node.right);
    };
    return go(this.root);
  }

  /** dfsPreOrder(): [node, left, right] */
  dfsPreOrder() {
    const out = [];
    const walk = (n) => {
      if (!n) return;
      out.push(n.val);
      walk(n.left);
      walk(n.right);
    };
    walk(this.root);
    return out;
  }

  /** dfsInOrder(): [left, node, right] */
  dfsInOrder() {
    const out = [];
    const walk = (n) => {
      if (!n) return;
      walk(n.left);
      out.push(n.val);
      walk(n.right);
    };
    walk(this.root);
    return out;
  }

  /** dfsPostOrder(): [left, right, node] */
  dfsPostOrder() {
    const out = [];
    const walk = (n) => {
      if (!n) return;
      walk(n.left);
      walk(n.right);
      out.push(n.val);
    };
    walk(this.root);
    return out;
  }

  /** bfs(): level order (no Array.shift to keep it simple/fast) */
  bfs() {
    const out = [];
    if (!this.root) return out;
    const q = [this.root];
    let i = 0;
    while (i < q.length) {
      const n = q[i++];
      out.push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
    return out;
  }

  /** remove(val): remove a node, return the removed node (or undefined if not found) */
  remove(val) {
    // find node and its parent
    let parent = null;
    let node = this.root;
    while (node && node.val !== val) {
      parent = node;
      node = val < node.val ? node.left : node.right;
    }
    if (!node) return undefined; // not found

    // helper to re-link parent's child
    const replaceChild = (p, oldChild, newChild) => {
      if (!p) { this.root = newChild; return; } // removing root
      if (p.left === oldChild) p.left = newChild;
      else if (p.right === oldChild) p.right = newChild;
    };

    // case: two children -> swap with inorder successor
    if (node.left && node.right) {
      // find leftmost of right subtree
      let ps = node, succ = node.right;
      while (succ.left) { ps = succ; succ = succ.left; }
      // copy successor's value into node
      node.val = succ.val;
      // now delete successor (succ has at most one child on the right)
      if (ps.left === succ) ps.left = succ.right;
      else ps.right = succ.right;
      return node; // removed "value" logically
    }

    // case: 0 or 1 child
    const child = node.left ? node.left : node.right;
    replaceChild(parent, node, child);
    return node;
  }





  /** isBalanced(): true if height difference <= 1 at every node */
  isBalanced() {
    const height = (n) => {
      if (!n) return 0;
      const L = height(n.left);
      if (L === -1) return -1;
      const R = height(n.right);
      if (R === -1) return -1;
      if (Math.abs(L - R) > 1) return -1;
      return Math.max(L, R) + 1;
    };
    return height(this.root) !== -1;
  }

  /** findSecondHighest(): returns 2nd largest value or undefined */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;
    let cur = this.root, prev = null;
    // go to the max
    while (cur.right) { prev = cur; cur = cur.right; }
    // if max has a left subtree, 2nd max is the right-most in that subtree
    if (cur.left) {
      cur = cur.left;
      while (cur.right) cur = cur.right;
      return cur.val;
    }
    // else parent is 2nd max
    return prev ? prev.val : undefined;
  }

  /** dfsInOrderIterative(): in-order without recursion */
  dfsInOrderIterative() {
    const res = [];
    const stack = [];
    let cur = this.root;
    while (cur || stack.length) {
      while (cur) { stack.push(cur); cur = cur.left; }
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
    return res;
  }
}









module.exports = BinarySearchTree;
