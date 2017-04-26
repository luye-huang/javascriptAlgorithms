/**
 * Created by luye on 25/04/2017.
 */
// max heap
// why use index with heap? no longer swap big values, more traceable
(function () {
  function HeapIndex(array) {
    this.array = [];
    this.index = [];
    array.forEach((item, index)=>this.insert(item, index));
  }

  HeapIndex.prototype = {
    _shiftDown: function () {
      //size is up to the length of array, array has been reduced atm
      [this.index[0], this.index[this.size()]] = this._swap(this.index[0], this.index[this.size()]);
      this.index.pop();
      let currentPosition = 0;
      while (currentPosition < this.size()) {
        let childPosition = 2 * currentPosition + 1;
        if (childPosition + 1 < this.size() && this.array[this.index[childPosition]] < this.array[this.index[childPosition + 1]]) {
          childPosition++;
        }
        if (this.array[this.index[currentPosition]] < this.array[this.index[childPosition]]) {
          [this.index[currentPosition], this.index[childPosition]] = this._swap(this.index[currentPosition], this.index[childPosition]);
          currentPosition = childPosition;
        }
        else {
          break;
        }
      }
    },
    // currentPosition, parentPosition are position in the heap tree;
    _shiftUp: function (index) {
      let currentPosition = this.index[index];
      while (true) {
        let parentPosition = Math.floor((currentPosition - 1) / 2);
        if (parentPosition < 0)break;
        if (this.array[this.index[currentPosition]] > this.array[this.index[parentPosition]]) {
          [this.index[currentPosition], this.index[parentPosition]] = this._swap(this.index[currentPosition], this.index[parentPosition]);
        }
        else {
          break;
        }
        currentPosition = parentPosition;
      }
    },
    _swap: function (a, b) {
      return [b, a];
    },
    value: function () {
      return this;
    },
    pop: function () {
      const result = this.array[this.index[0]];
      this.array.splice(this.index[0], 1);
      this._shiftDown();
      console.log(2);
      return result;
    },
    insert: function (item, index = this.size()) {
      this.array.push(item);
      this.index.push(index);
      this._shiftUp(index);
    },
    size: function () {
      return this.array.length;
    }
  }
  window.HeapIndex = HeapIndex;
})();
