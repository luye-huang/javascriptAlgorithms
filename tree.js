/**
 * Created by luye on 22/12/2017.
 */
// 144 preorder traversal

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


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
    if (!preorder.length) {
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


/** 236 双递归 有点蠢的解法 大量重复操作。思路:定义一个子函数查找这个节点为根的树是否具有这个值,若左右都有,则返回根节点;若一边都有则递归这一节点。
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
    if (!root) {
        return null;
    }
    if (root.val == p.val || root.val == q.val) {
        return root;
    }
    const left = hasVal(root.left, p.val) || hasVal(root.left, q.val);
    const right = hasVal(root.right, p.val) || hasVal(root.right, q.val);
    if (left && right) {
        return root;
    } else if (left) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (right) {
        return lowestCommonAncestor(root.right, p, q);
    }
};

const hasVal = (node, val)=> {
    if (!node) {
        return false;
    }
    return node.val == val || hasVal(node.left, val) || hasVal(node.right, val);
};

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
// node2.right = node5;
// node3.left = node9;
// node3.right = node6;
// node5.left = node7;
// node5.right = node8;
// // console.log(lowestCommonAncestor(node1, node3, node5), 3);
// //
// console.log(lowestCommonAncestor(node1, node2, node8), 5);
//
// console.log(lowestCommonAncestor(node1, node2, node3), 3);


/** 297 用队列做层序遍历
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */


/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    if (!root) {
        return '[]';
    }
    const queue = [root], ret = [root.val];
    while (queue.length) {
        const node = queue.shift();
        if (node.left) {
            queue.push(node.left);
            ret.push(node.left.val);
        } else {
            ret.push(null);
        }
        if (node.right) {
            queue.push(node.right);
            ret.push(node.right.val);
        } else {
            ret.push(null);
        }
    }
    while (ret[ret.length - 1] == null) {
        ret.pop();
    }
    return `[${ret + ''}]`;
};

/**
 * Decodes your encoded data to tree.
 *
 * //@param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    if (!data || data.length < 3) {
        return null;
    }
    data = data.substring(1, data.length - 1).split(',').map(a => a == '' ? null : parseInt(a));
    const root = new TreeNode(data[0]);
    const queue = [root];
    data.shift();
    let prop = 'left';
    if (!data.length) {
        return root;
    }
    while (true) {
        const node = queue.shift();
        if (node) {
            prop = 'left';
            let val = data.shift();
            if (val != null) {
                const child = new TreeNode(val);
                node[prop] = child;
                queue.push(child);
            } else {
                // queue.push(null);
            }
            if (!data.length) {
                break;
            }
            val = data.shift();
            prop = 'right';
            if (val != null) {
                const child = new TreeNode(val);
                node[prop] = child;
                queue.push(child);
            } else {
                // queue.push(null);
            }
            if (!data.length) {
                break;
            }
        } else {
            data.shift();
            data.shift();
            if (!data.length) {
                break;
            }
        }
    }
    return root;
};

// const node1 = new TreeNode(1);
// const node2 = new TreeNode(2);
// const node3 = new TreeNode(3);
// const node4 = new TreeNode(4);
// const node5 = new TreeNode(5);
//
//
// node1.left = node2;
// node1.right = node3;
// node3.left = node4;
// node3.right = node5;


const node1 = new TreeNode(5);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(2);
const node5 = new TreeNode(4);
const node6 = new TreeNode(3);
const node7 = new TreeNode(1);

node1.left = node2;
node1.right = node3;
node3.left = node4;
node3.right = node5;
node4.left = node6;
node4.right = node7;

//
// console.log(serialize(node1));
// console.log(deserialize(serialize(node1)));
// console.log(deserialize('[1,2,3,,,4,5]'));
// console.log(deserialize('[3,2,4,1]'));