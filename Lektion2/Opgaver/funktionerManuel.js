let list = [1, 2, 3, 5, 6, 8, 9, 20, 10, 12]
console.log(max(list));
console.log(min(list));
console.log(contains(list, 5) + "tallet 5 findes i listen");
console.log(contains(list,2) + "tallet 2 findes i listen");
console.log(sum(list) + " er summen af listen"); 



function max(elements) {
    let maxValue = elements[0];
    for (i = 0; i < elements.length; i++) {
        if (maxValue < elements[i]) {
            maxValue = elements[i];
        }
    }
    return maxValue;
}


function min(elements) {
    let minValue = elements[0];
    for (i = 0; i < elements.length; i++) {
        if (minValue > elements[i]) {
            minValue = elements[i];
        }
    }
    return minValue;
}

function contains(elements, value) {
    for (i = 0; i < elements.length; i++) {
        if (elements[i] == value) {
            return true;
        } else {
            return false;
        }
    }
}

function sum(elements) {
    let sumValue = 0;
    for (i = 0; i < elements.length; i++) {
        sumValue += elements[i];
    }
    return sumValue;
}