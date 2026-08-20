function primeUptil(top) {
    for (let i = 2; i <= top; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            console.log(i);
        }
    }
}

primeUptil(1000);
console.log('Prime numbers up to 1000:');
