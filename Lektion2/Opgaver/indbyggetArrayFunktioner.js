

let list = [1, 2, 3, 5, 6, 8, 9, 20, 10, 12];

Array.prototype.max = function (elements) {
    let maxValue = elements[0];
    for (i = 0; i < elements.length; i++) {
        if (maxValue < elements[i]) {
            maxValue = elements[i];
        }
    }
    return maxValue;
}


Array.prototype.min = function (elements) {
    let minValue = elements[0];
    for (i = 0; i < elements.length; i++) {
        if (minValue > elements[i]) {
            minValue = elements[i];
        }
    }
    return minValue;
}

Array.prototype.contains = function (elements, value) {
    for (i = 0; i < elements.length; i++) {
        if (elements[i] == value) {
            return true;
        }
    }
    return false;
}

Array.prototype.sum = function (elements) {
    let sumValue = 0;
    for (i = 0; i < elements.length; i++) {
        sumValue += elements[i];
    }
    return sumValue;
}

console.log(list.max(list));
console.log(list.min(list));
console.log(list.contains(list, 5) + "tallet 5 findes i listen");
console.log(list.contains(list,2) + "tallet 2 findes i listen");
console.log(list.contains(list, 11) + "tallet 11 findes ikke i listen");
console.log(list.sum(list) + " er summen af listen");