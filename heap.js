/**
 * Created by luye on 25/04/2017.
 */
// max heap
// why use index with heap? no longer swap big values, more traceable
(function () {
  function Heap(array) {
    this.array = [];
    this.index = [];
    array.forEach((item)=>this.insert(item));
  }

  Heap.prototype = {
    _shiftDown: function (index) {
      while (index < this.size()) {
        let childIndex = 2 * index + 1;
        if (childIndex + 1 < this.size() - 1 && this.array[childIndex] < this.array[childIndex + 1]) {
          childIndex++;
        }
        if (this.array[index] < this.array[childIndex]) {
          [this.array[index], this.array[childIndex]] = this._swap(this.array[index], this.array[childIndex]);
          index = childIndex;
        }
        else{
          break;
        }
      }
    },
    _shiftUp: function (index) {
      while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (this.array[index] > this.array[parentIndex]) {
          [this.array[index], this.array[parentIndex]] = this._swap(this.array[index], this.array[parentIndex]);
        }
        index = parentIndex;
      }
    },
    _swap: function (a, b) {
      return [b, a];
    },
    value: function () {
      return this.array;
    },
    pop: function () {
      const result = this.array[0];
      [this.array[0], this.array[this.size() - 1]] = this._swap(this.array[0], this.array[this.size() - 1]);
      this.array.pop();
      this._shiftDown(0);
      console.log(2);
      return result;
    },
    insert: function (item) {
      this.array.push(item);
      this._shiftUp(this.size() - 1);
    },
    size: function () {
      return this.array.length;
    }
  }
  window.Heap = Heap;
})();
