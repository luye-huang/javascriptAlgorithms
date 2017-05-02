/**
 * Created by luye on 2017/4/27.
 */
(function () {
  function BinaryTree(data) {
    console.log(23);
    if(data.constructor == Array){
      data.forEach(function (value, index) {
        this.insert(value);
      });
    }
    else{
      this.root = data;
    }
  }
  
  BinaryTree.prototype = {
    insert: function (value) {
      console.log(value);
    },
    getRoot: function(){
      return this.root;
    }
  };
  
  function Node(data, leftChild, rightChild) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
  
  window.BinaryTree = BinaryTree;
})();