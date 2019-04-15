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
var zigzagLevelOrder = function (root) {
    if (!root)return [];
    const queue = [], res = [];
    let order = false, layer = 0, row = [];
    root.layer = layer;
    queue.push(root);
    while (queue.length > 0) {
        const node = queue.pop();
        if (node.layer == layer) {
            row.push(node.val);
            if (node.left) {
                node.left.layer = layer + 1;
                queue.unshift(node.left);
            }
            if (node.right) {
                node.right.layer = layer + 1;
                queue.unshift(node.right);
            }
        } else {
            queue.push(node);
            layer++;
            order && row.reverse();
            res.push(row);
            row = [];
            order = !order;
        }
    }
    order && row.reverse();
    res.push(row);
    return res;
};


/** 105 递归:inorder中根节点左侧为左子树,右侧为右子树。搜索左子树时,找到preorder中第一个出现在left和right之间的节点,令当前根节点的left为它,右边亦然
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
var buildTree = function (preorder, inorder) {
    if(!preorder.length){
        return null;
    }
    const root = new TreeNode(preorder[0]);
    const rootIndex = inorder.findIndex((a) => a == preorder[0]);
    //构建左边
    build(root, preorder, inorder, 0, rootIndex - 1, 'left', 1);
    //构建右边
    build(root, preorder, inorder, rootIndex + 1, preorder.length - 1, 'right', 1);
    return root;
};
//加上rootIndex,为preorder中索引第一个出现在子树段中作为根节点的位置的起始点,runtime比每次从0开始减少100倍
var build = function (root, preorder, inorder, left, right, dir, rootIndex) {
    if (left > right) {
        return;
    }
    for (let i = rootIndex; i < preorder.length; i++) {
        for (let j = left; j <= right; j++) {
            if (preorder[i] == inorder[j]) {
                const node = new TreeNode(preorder[i]);
                root[dir] = node;
                build(node, preorder, inorder, left, j - 1, 'left', i + 1);
                build(node, preorder, inorder, j + 1, right, 'right', i + 1);
                return;
            }
        }
    }
};


// const node1 = new TreeNode(3);
// const node2 = new TreeNode(9);
// const node3 = new TreeNode(20);
// const node4 = new TreeNode(15);
// const node5 = new TreeNode(7);
// node1.left = node2;
// node1.right = node3;
// node3.left = node4;
// node3.right = node5;
// // console.log(buildTree([], []));
// console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));


// 111
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    const level = arguments[1] ? arguments[1] : 0;
    if (!root) return level;
    if (!root.left && !root.right) {
        return level + 1;
    } else if (root.left && !root.right) {
        return arguments.callee(root.left, level + 1);
    } else if (!root.left && root.right) {
        return arguments.callee(root.right, level + 1);
    } else {
        return Math.min(arguments.callee(root.left, level + 1), arguments.callee(root.right, level + 1));
    }
};
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

// const node1 = new TreeNode(5);
// const node2 = new TreeNode(4);
// const node3 = new TreeNode(8);
// const node4 = new TreeNode(11);
// const node5 = new TreeNode(13);
// const node6 = new TreeNode(4);
// const node7 = new TreeNode(7);
// const node8 = new TreeNode(2);
// const node9 = new TreeNode(5);
// const node10 = new TreeNode(1);
// node1.left = node2;
// node1.right = node3;
// node2.left = node4;
// node3.left = node5;
// node3.right = node6;
// node4.left = node7;
// node4.right = node8;
// node6.left = node9;
// node6.right = node10;
//
// console.log(pathSum(node1, 22));


/** 145
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


/** 236 获得两个值的路径,比较两个路径,找到第一个不同的元素
 *  javascript问题 没过
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 *
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    const paths = [];
    travarse(root, p, q, '', paths);
    const path1 = paths[0].split(',');
    const path2 = paths[1].split(',');
    let count = 0, node = root;
    while (path1[count] !== path2[count]) {
        count++;
    }
    while (count > 0) {
        node = node[path1[count]];
    }
    console.log(paths);
    return node.val;
};

var travarse = function (root, p, q, path, paths) {
    if (root.val == p.val || root.val == q.val) {
        paths.push(path);
        if (paths.length == 2) {
            return;
        }
    }
    if (root.left) {
        travarse(root.left, p, q, path + ',left', paths);
    }
    if (root.right) {
        travarse(root.right, p, q, path + ',right', paths);
    }
}

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// const node1 = new TreeNode(3);
// const node2 = new TreeNode(5);
// const node3 = new TreeNode(1);
// const node4 = new TreeNode(6);
// const node5 = new TreeNode(2);
// const node6 = new TreeNode(8);
// const node7 = new TreeNode(7);
// const node8 = new TreeNode(4);
// const node9 = new TreeNode(0);
//
// node1.left = node2;
// node1.right = node3;
// node2.left = node4;
// node2.rigth = node5;
// node3.left = node9;
// node3.rigth = node6;
// node5.left = node7;
// node5.rigth = node8;
//
// console.log(lowestCommonAncestor(node1, node2, node3));