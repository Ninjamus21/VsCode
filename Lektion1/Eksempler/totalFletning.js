function fletTotal(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    // Indsæt resten af det array der ikke er tomt endnu
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

let arr1 = [1, 4, 7, 9, 13];
let arr2 = [0, 2, 8, 16];

let flettet = fletTotal(arr1, arr2);
console.log(flettet.toString());