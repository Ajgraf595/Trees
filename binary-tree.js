// binary-tree.js

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root || null;
  }

  // shortest path to a leaf
  minDepth() {
    if (!this.root) return 0;
    const q = [[this.root, 1]]; // node + depth
    while (q.length) {
      const [n, d] = q.shift();
      if (!n.left && !n.right) return d;
      if (n.left) q.push([n.left, d + 1]);
      if (n.right) q.push([n.right, d + 1]);
    }
    return 0; // shouldn't hit
  }

  // longest path to a leaf
  maxDepth(node = this.root) {
    if (!node) return 0;
    const left = this.maxDepth(node.left);
    const right = this.maxDepth(node.right);
    return Math.max(left, right) + 1;
  }

  // max path sum (can start/end anywhere, can't reuse nodes)
  maxSum() {
    let best = -Infinity;
    function gain(n) {
      if (!n) return 0;
      const leftGain = Math.max(0, gain(n.left));
      const rightGain = Math.max(0, gain(n.right));
      // price of a path through n
      const price = n.val + leftGain + rightGain;
      if (price > best) best = price;
      // return best one-side path (to chain up)
      return n.val + Math.max(leftGain, rightGain);
    }
    gain(this.root);
    // if tree was empty, best stays -Infinity, so normalize to 0
    return best === -Infinity ? 0 : best;
  }

  // next value strictly larger than x
  nextLarger(x) {
    if (!this.root) return null;
    let ans = null;
    const q = [this.root];
    while (q.length) {
      const n = q.shift();
      if (typeof n.val === "number" && n.val > x) {
        if (ans === null || n.val < ans) ans = n.val;
      }
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
    return ans;
  }


  // are two nodes cousins? same depth, different parents
  areCousins(node1, node2) {
    if (!this.root || !node1 || !node2) return false;
    if (this.root === node1 || this.root === node2) return false; // root has no parent

    const q = [[this.root, null, 0]]; // node, parent, depth
    let info = new Map(); // node -> {parent, depth}

    while (q.length) {
      const [n, p, d] = q.shift();
      info.set(n, { parent: p, depth: d });
      if (n.left) q.push([n.left, n, d + 1]);
      if (n.right) q.push([n.right, n, d + 1]);
    }

    const a = info.get(node1);
    const b = info.get(node2);
    if (!a || !b) return false;
    return a.depth === b.depth && a.parent !== b.parent;
  }

  // serialize tree to a string (preorder with # for null)
  static serialize(tree) {
    function pre(n, out) {
      if (!n) { out.push("#"); return; }
      out.push(String(n.val));
      pre(n.left, out);
      pre(n.right, out);
    }
    const out = [];
    pre(tree ? tree.root : null, out);
    return out.join(",");
  }

  // deserialize string back to BinaryTree
  static deserialize(data) {
    if (!data || data.length == 0) return new BinaryTree(null);
    const vals = data.split(",");
    let idx = 0;
    function build() {
      if (idx >= vals.length) return null;
      const v = vals[idx++];
      if (v === "#") return null;
      const node = new BinaryTreeNode(Number(v));
      node.left = build();
      node.right = build();
      return node;
    }
    return new BinaryTree(build());
  }

  // LCA as a method
  lowestCommonAncestor(p, q, cur = this.root) {
    function dfs(node) {
      if (!node) return null;
      if (node === p || node === q) return node;
      const L = dfs(node.left);
      const R = dfs(node.right);
      if (L && R) return node;
      return L || R;
    }
    return dfs(cur);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
