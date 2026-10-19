class StringStack {
    constructor() {
        this.stack = [];
    }

    push(str) {
        if (typeof str !== 'string') {
            throw new Error("Only strings can be pushed onto the stack");
        }
        this.stack.push(str);
    }

    pop() {
        return this.stack.pop();
    }
}

const stack = new StringStack();
stack.push("Hello");
stack.push("World");
console.log(stack.pop()); // Output: World
console.log(stack.pop()); // Output: Hello  

