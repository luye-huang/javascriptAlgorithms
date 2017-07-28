/**
 * Created by luye on 20/04/2017.
 */
let array1 = [1, 72, 60, 65, 106, 3, 134, 45, 2, 7, 13, 22, 22, 41, 88, 51, 167, 23, 53, 57, 6, 23, 4, 19, 6, 55, 118, 61];

const sort = {
  swap(a, b){
    let temp = a;
    a = b;
    b = temp;
    return [a, b];
  },

  resetArray(){
    array1 = [1, 72, 60, 65, 106, 3, 134, 45, 2, 7, 13, 22, 22, 41, 88, 51, 167, 23, 53, 57, 6, 23, 4, 19, 6, 55, 118, 61];
    console.log('reset');
  },

  selectionSort(arr){
    console.time('selection sort');
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          [arr[i], arr[j]] = this.swap(arr[i], arr[j]);
        }
      }
    }
    console.timeEnd('selection sort');
    return arr;
  },

  insertionSort(arr){
    console.time('insertion sort');
    for (let i = 1; i < arr.length; i++) {
      // let value = arr[i];
      if (arr[i] > arr[i - 1])continue;
      for (let j = i; j > 0; j--) {
        if (arr[j - 1] > arr[j]) {
          [arr[j - 1], arr[j]] = this.swap(arr[j - 1], arr[j]);
        }
      }
    }
    console.timeEnd('insertion sort');
    return arr;
  },

  shellSort(arr){
    console.time('shell sort');
    for (let group = arr.length / 2; group >= 1; group = Math.floor(group / 2)) {
      for (let i = group; i < arr.length; i++) {
        for (let j = i; j > 0; j -= group) {
          if (arr[j] < arr[j - group]) {
            [arr[j], arr[j - group]] = this.swap(arr[j], arr[j - group]);
          }
        }
      }
    }
    console.timeEnd('shell sort');
    return arr;
  },

  mergeSort(arr){
    let len = arr.length;
    if (len == 2) {
      if (arr[0] >= arr[1]) {
        [arr[0], arr[1]] = this.swap(arr[0], arr[1]);
      }
    }
    else if (len < 2) {
    }
    else {
      len = Math.floor(len / 2);
      const arr1 = this.mergeSort(arr.slice(0, len));
      const arr2 = this.mergeSort(arr.slice(len));
      // if the last element of the first array is less than the first one of the second one, skip merging
      if (arr1[arr1.length - 1] <= arr2[0]) {
        return arr1.concat(arr2);
      }
      for (let k = 0, i = 0, j = 0; k < arr.length; k++) {
        if (Object.is(arr1[i], undefined)) {
          arr[k] = arr2[j];
          j++;
        }
        else if (Object.is(arr2[j], undefined)) {
          arr[k] = arr1[i];
          i++;
        }
        else {
          if (arr1[i] < arr2[j]) {
            arr[k] = arr1[i];
            i++;
          }
          else {
            arr[k] = arr2[j];
            j++;
          }
        }
      }
    }
    return arr;
  },

  quickSort(arr, l = 0, r = arr.length - 1){
    if (l >= r || l < 0 || r >= arr.length) {
      return arr;
    }
    //partition
    const index = Number.parseInt(l + Math.random() * (r - l));
    //
    [arr[l], arr[index]] = [arr[index], arr[l]];
    let i = l + 1;
    let ls = l, gt = r;
    // two directions
    // while (ls < gt) {
    //   if (arr[i] > arr[l]) {
    //     [arr[i], arr[gt]] = [arr[gt], arr[i]];
    //     gt--;
    //   }
    //   else {
    //     ls++;
    //     i++;
    //   }
    // }

    //three directions
    while (ls < gt && ls < arr.length - 1) {
      if (arr[i] > arr[l]) {
        [arr[i], arr[gt]] = [arr[gt], arr[i]];
        gt--;
      }
      else if (arr[i] === arr[l]) {
        i++
      }
      else {
        [arr[i], arr[ls + 1]] = [arr[ls + 1], arr[i]];
        i++;
        ls++;
      }
    }
    [arr[l], arr[ls]] = [arr[ls], arr[l]];
    this.quickSort(arr, l, ls - 1);
    this.quickSort(arr, ls + 1, r);
    return arr;
  }
};

// console.log(sort.selectionSort(array1));
// sort.resetArray();
console.log(sort.insertionSort(array1));
// sort.resetArray();
// console.log(sort.shellSort(array1));
// sort.resetArray();
// console.time('merge sort');
// console.log(sort.mergeSort(array1));
// console.timeEnd('merge sort');
console.time('quick sort');
// [3, 12, 2, 5, 4, 8]
console.log(sort.quickSort(array1));
console.timeEnd('quick sort');