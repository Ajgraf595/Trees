// tree.js
// n-ary tree (relatable as a teacher, we use the same terms for the same trees!)

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children; // array of TreeNode
  }
}

class Tree {
  constructor(root = null) {
    this.root = root || null;
  }

  // add up all the values
  sumValues() {
    if (!this.root) return 0;
    let total = 0;
    const stack = [this.root];
    while (stack.length) {
      const node = stack.pop();
      // just in case someone sneaks in a non-number
      total += Number(node.val) || 0;
      if (node.children && node.children.length) {
        for (const kid of node.children) stack.push(kid);
      }
    }
    return total;
  }

  // count evens
  countEvens() {
    if (!this.root) return 0;
    let cnt = 0;
    const todo = [this.root];
    while (todo.length) {
      const n = todo.pop();
      if (typeof n.val === "number" && n.val % 2 === 0) cnt++;
      if (n.children) for (const c of n.children) todo.push(c);
    }
    return cnt;
  }

  // how many > x
  numGreater(x) {
    if (!this.root) return 0;
    let more = 0;
    const q = [this.root];
    while (q.length) {
      const cur = q.pop();
      if (typeof cur.val === "number" && cur.val > x) more++;
      if (cur.children) for (const c of cur.children) q.push(c);
    }
    return more;
  }
}

module.exports = { Tree, TreeNode };
