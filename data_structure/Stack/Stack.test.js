import Stack from "./Stack";

let names_arr = ["Clayton", "Raymond", "Cynthia", "Jennifer", "Bryan", "Danny"];

test("constructor: ", () => {
    // 不传参数时，列表为空
    let stack = new Stack();
    expect(stack.top).toBe(-1);
    expect(stack.length).toBe(0);
    expect(stack.empty).toBe(true);

    // 传入一个数组时
    stack = new Stack(names_arr);
    expect(stack.top).toBe(names_arr.length - 1);
    expect(stack.length).toBe(names_arr.length);
    expect(stack.empty).toBe(false);

    // 传入一个非数组元素时，等同于传入空数组
    stack = new Stack("1");
    expect(stack.top).toBe(-1);
    expect(stack.length).toBe(0);
    expect(stack.empty).toBe(true);
});

test("property -> length: ", () => {
    let stack = new Stack();
    expect(stack.length).toBe(0);
    names_arr.forEach((name, index) => {
        let stack_tmp = new Stack(names_arr.slice(index));
        expect(stack_tmp.length).toBe(names_arr.length - index);
    });
});

test("property -> top: ", () => {
    let stack = new Stack();
    expect(stack.top).toBe(-1);
    names_arr.forEach((name, index) => {
        let stack_tmp = new Stack(names_arr.slice(index));
        expect(stack_tmp.top).toBe(names_arr.length - index - 1);
    });
});

test("property -> empty: ", () => {
    let stack = new Stack();
    expect(stack.empty).toBe(true);
    names_arr.forEach((name, index) => {
        let stack_tmp = new Stack(names_arr.slice(index));
        expect(stack_tmp.empty).toBe(false);
    });
});

test("method -> push: ", () => {
    let stack = new Stack();
    names_arr.forEach((name, index) => {
        expect(stack._dataSource).not.toContain(name);
        expect(stack.length).toBe(index);
        expect(stack.top).toBe(index - 1);
        expect(stack.empty).toBe(index === 0);

        stack.push(name);
        expect(stack._dataSource).toContain(name);
        expect(stack.length).toBe(index + 1);
        expect(stack.top).toBe(index);
        expect(stack.empty).toBe(false);
    });
});

test("method -> pop: ", () => {
    let stack = new Stack(names_arr);
    names_arr
        .slice()
        .reverse()
        .forEach((name, index) => {
            expect(stack._dataSource).toContain(name);
            expect(stack.length).toBe(names_arr.length - index);
            expect(stack.top).toBe(names_arr.length - index - 1);
            expect(stack.empty).toBe(false);

            expect(stack.pop()).toEqual(name);
            expect(stack._dataSource).not.toContain(name);
            expect(stack.length).toBe(names_arr.length - index - 1);
            expect(stack.top).toBe(names_arr.length - index - 2);
            expect(stack.empty).toBe(index === names_arr.length - 1);
        });

    expect(stack.empty).toBe(true);
    expect(stack.pop()).toBeUndefined();
});

test("method -> peak: ", () => {
    let stack = new Stack();
    names_arr.forEach((name, index) => {
        if (index === 0) {
            expect(stack.peak()).toBeUndefined();
        } else {
            expect(stack.peak()).toEqual(names_arr[index - 1]);
        }
        stack.push(name);
        expect(stack.peak()).toEqual(names_arr[index]);
    });
    names_arr.forEach((name, index) => {
        expect(stack.peak()).toEqual(names_arr[names_arr.length - index - 1]);

        stack.pop();
        if (names_arr.length - index - 2 >= 0) {
            expect(stack.peak()).toEqual(
                names_arr[names_arr.length - index - 2]
            );
        } else {
            expect(stack.peak()).toBeUndefined();
        }
    });
});

test("method -> clear: ", () => {
    let stack = new Stack();
    names_arr.forEach((name, index) => {
        expect(stack.empty).toBe(true);
        expect(stack.length).toBe(0);
        expect(stack.top).toBe(-1);
        stack.push(name);
        expect(stack.empty).toBe(false);
        expect(stack.length).toBe(1);
        expect(stack.top).toBe(0);
        stack.clear();
        expect(stack.empty).toBe(true);
        expect(stack.length).toBe(0);
        expect(stack.top).toBe(-1);
    });

    stack = new Stack(names_arr);
    expect(stack.empty).toBe(false);
    expect(stack.length).toBe(names_arr.length);
    expect(stack.top).toBe(names_arr.length - 1);
    stack.clear();
    expect(stack.empty).toBe(true);
    expect(stack.length).toBe(0);
    expect(stack.top).toBe(-1);
});
