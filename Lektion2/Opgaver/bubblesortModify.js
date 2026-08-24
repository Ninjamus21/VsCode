let list = [7, 13, 9, 8, 4, 1, 2, 16, 0];
console.log(list);
bubbleSortMedcompare(list);
console.log(list);
let index = bubbleSortBinarySearch(list, 8);
console.log(index);

function bubbleSort(list) {
    function swap(j) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
    }

    for (let i = list.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (list[j] > list[j + 1]) {
                swap(j);
            }
        }
    }
}

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

function bubbleSortMedcompare(list) {
    // local functions 
    function swap(j) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
    }
    function compare(s1, s2) {
        if (s1 < s2) {
            return -1;
        } else if (s1 > s2) {
            return 1;
        } else {
            return 0;
        }
    }

    // the heart of the bubble sort algorithm
    for (let i = list.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (compare(list[j], list[j + 1]) > 0) {
                swap(j);
            }
        }
    }
}