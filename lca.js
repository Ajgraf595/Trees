// lca.js
// standalone leetcode style. simple recursion.

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// returns the node (not the value). assumes all vals unique.
function lowestCommonAncestor(root, p, q) {
  if (!root) return null;
  if (root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}

module.exports = { TreeNode, lowestCommonAncestor };
