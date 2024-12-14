const iterableObj = {
    data: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => ({
                value: this.data[index++],
                done: index > this.data.length
            })
        };
    }
};
console.log(iterableObj); // { data: [ 1, 2, 3 ], [Symbol(Symbol.iterator)]: [Function] }
for (const value of iterableObj) {
    console.log(value); // 1, 2, 3
}
