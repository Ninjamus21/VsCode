// bubbleSort.js
let list = [7, 13, 9, 8, 4, 1, 2, 16, 0];

for (let i = list.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (list[j] > list[j + 1]) {
            let temp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = temp;
        }
    }
}
console.log(list.toString()); // => 0,1,2,4,7,8,9,13,16

let list2 = ["peter", "anna", "lars", "ole", "kristian"];
for (let i = list2.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (list2[j] > list2[j + 1]) {
            let temp = list2[j];
            list2[j] = list2[j + 1];
            list2[j + 1] = temp;
        }
    }
}

console.log(list2.toString()); // => anna,kristian,lars,ole,peter

function bubbleSortBinarySearch(list, target) {
let low = 0;
let high = list.length - 1;

while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (list[mid] == target) {
        return mid; // found at this index
    } else if (list[mid] < target) {
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}

return -1; // not found
}

console.log(bubbleSortBinarySearch(list, 9)); // => index of 9 after sorting
console.log(bubbleSortBinarySearch(list, 100)); // => -1
console.log(bubbleSortBinarySearch(list2, "lars")); 