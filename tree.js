/**
 * Created by luye on 22/12/2017.
 */
// 144 preorder traversal

// 94 inorder traversal
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// var inorderTraversal = function (root) {
//     const res = [];
//     traverse(root, res);
//     return res;
// };
//
// function traverse(node, res){
//     if(!node){
//         return;
//     }
//     arguments.callee(node.left, res);
//     res.push(node.val);
//     arguments.callee(node.right, res);
// }
//
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }

// 145

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// var postorderTraversal = function(root) {
//     const res = [];
//     traverse(root, res);
//     return res;
// };
//
// function traverse(node, res){
//     if(!node){
//         return;
//     }
//     arguments.callee(node.left, res);
//     arguments.callee(node.right, res);
//     res.push(node.val);
// }
//
// const node1 = new TreeNode(1);
// const node2 = new TreeNode(2);
// const node3 = new TreeNode(3);
// node1.right = node2;
// node2.left = node3;
//
// console.log(postorderTraversal(node1));


// 103

// Definition for a binary tree node.
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
/*
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var zigzagLevelOrder = function (root) {
//     if(!root)return [];
//     const queue = [], res = [];
//     let order = false, layer = 0, row = [];
//     root.layer = layer;
//     queue.push(root);
//     while (queue.length > 0) {
//         const node = queue.pop();
//         if (node.layer == layer) {
//             row.push(node.val);
//             if (node.left) {
//                 node.left.layer = layer + 1;
//                 queue.unshift(node.left);
//             }
//             if (node.right) {
//                 node.right.layer = layer + 1;
//                 queue.unshift(node.right);
//             }
//         } else {
//             queue.push(node);
//             layer++;
//             order && row.reverse();
//             res.push(row);
//             row = [];
//             order = !order;
//         }
//     }
//     order && row.reverse();
//     res.push(row);
//     return res;
// };
//


// 111
/**
 * @param {TreeNode} root
 * @return {number}
 */
// var minDepth = function (root) {
//     const level = arguments[1] ? arguments[1] : 0;
//     if (!root) return level;
//     if (!root.left && !root.right) {
//         return level + 1;
//     } else if (root.left && !root.right) {
//         return arguments.callee(root.left, level + 1);
//     } else if (!root.left && root.right) {
//         return arguments.callee(root.right, level + 1);
//     } else {
//         return Math.min(arguments.callee(root.left, level + 1), arguments.callee(root.right, level + 1));
//     }
// };
//
// const node1 = new TreeNode(3);
// const node2 = new TreeNode(9);
// const node3 = new TreeNode(20);
// const node4 = new TreeNode(15);
// const node5 = new TreeNode(7);
// node1.left = node2;
// node1.right = node3;
// node2.left = node4;
// node3.right = node5;
// //
// console.log(minDepth(node1));


// 113

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var pathSum = function (root, sum) {
    if (!root) return [];
    let sumTemp = arguments[2] ? arguments[2] : 0;
    let path = arguments[3] ? arguments[3] : [];
    const result = arguments[4] ? arguments[4] : [];
    const pathAcc = path.concat(root.val);
    sumTemp += root.val;
    // console.log(result);
    // console.log(root.val);
    if (root.left)arguments.callee(root.left, sum, sumTemp, pathAcc, result);
    if (root.right)arguments.callee(root.right, sum, sumTemp, pathAcc, result);
    if (!root.left && !root.right) {
        if (sumTemp == sum) {
            result.push(pathAcc);
        }
    }
    return result;
};

const node1 = new TreeNode(5);
const node2 = new TreeNode(4);
const node3 = new TreeNode(8);
const node4 = new TreeNode(11);
const node5 = new TreeNode(13);
const node6 = new TreeNode(4);
const node7 = new TreeNode(7);
const node8 = new TreeNode(2);
const node9 = new TreeNode(5);
const node10 = new TreeNode(1);
node1.left = node2;
node1.right = node3;
node2.left = node4;
node3.left = node5;
node3.right = node6;
node4.left = node7;
node4.right = node8;
node6.left = node9;
node6.right = node10;
//
console.log(pathSum(node1, 22));