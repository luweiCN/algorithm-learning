import Queue from "./Queue";

let names_arr = ["Clayton", "Raymond", "Cynthia", "Jennifer", "Bryan", "Danny"];

test("constructor: ", () => {
    // 不传参数时，列表为空
    let queue = new Queue();
    expect(queue.head).toBe(undefined);
    expect(queue.tail).toBe(undefined);
    expect(queue.length).toBe(0);
    expect(queue.empty).toBe(true);

    // 传入一个数组时
    queue = new Queue(names_arr);
    expect(queue.head).toBe(names_arr[0]);
    expect(queue.tail).toBe(names_arr[names_arr.length - 1]);
    expect(queue.length).toBe(names_arr.length);
    expect(queue.empty).toBe(false);

    // 传入一个非数组元素时，等同于传入空数组
    queue = new Queue("1");
    expect(queue.head).toBe(undefined);
    expect(queue.tail).toBe(undefined);
    expect(queue.length).toBe(0);
    expect(queue.empty).toBe(true);
});

test("property -> length: ", () => {
    let queue = new Queue();
    expect(queue.length).toBe(0);
    names_arr.forEach((name, index) => {
        let queue_tmp = new Queue(names_arr.slice(index));
        expect(queue_tmp.length).toBe(names_arr.length - index);
    });
});

test("property -> empty: ", () => {
    let queue = new Queue();
    expect(queue.empty).toBe(true);
    names_arr.forEach((name, index) => {
        let queue_tmp = new Queue(names_arr.slice(index));
        expect(queue_tmp.empty).toBe(false);
    });
});

test("property -> head: ", () => {
    let queue = new Queue();
    expect(queue.head).toBe(undefined);
    names_arr.forEach((name, index) => {
        let queue_tmp = new Queue(names_arr.slice(index));
        expect(queue_tmp.head).toBe(names_arr[index]);
    });
});

test("property -> tail: ", () => {
    let queue = new Queue();
    expect(queue.tail).toBe(undefined);
    names_arr.forEach((name, index) => {
        let queue_tmp = new Queue(names_arr.slice(index));
        expect(queue_tmp.tail).toBe(names_arr[names_arr.length - 1]);
    });
});

test("method -> enqueue: ", () => {
    let queue = new Queue();
    names_arr.forEach((name, index) => {
        expect(queue._dataSource).not.toContain(name);
        expect(queue.length).toBe(index);
        expect(queue.head).toBe(index ? names_arr[0] : undefined);
        expect(queue.tail).toBe(index ? names_arr[index - 1] : undefined);
        expect(queue.empty).toBe(index === 0);

        queue.enqueue(name);
        expect(queue._dataSource).toContain(name);
        expect(queue.length).toBe(index + 1);
        expect(queue.head).toBe(names_arr[0]);
        expect(queue.tail).toBe(name);
        expect(queue.empty).toBe(false);
    });
});

test("method -> dequeue: ", () => {
    let queue = new Queue(names_arr);
    names_arr.slice().forEach((name, index) => {
        expect(queue._dataSource).toContain(name);
        expect(queue.length).toBe(names_arr.length - index);
        expect(queue.head).toBe(names_arr[index]);
        expect(queue.tail).toBe(names_arr[names_arr.length - 1]);
        expect(queue.empty).toBe(false);

        expect(queue.dequeue()).toEqual(name);
        expect(queue._dataSource).not.toContain(name);
        expect(queue.length).toBe(names_arr.length - index - 1);
        expect(queue.head).toBe(names_arr[index + 1]);
        expect(queue.tail).toBe(
            index !== names_arr.length - 1
                ? names_arr[names_arr.length - 1]
                : undefined
        );
        expect(queue.empty).toBe(index === names_arr.length - 1);
    });

    expect(queue.empty).toBe(true);
    expect(queue.dequeue()).toBeUndefined();
});

test("method -> toString: ", () => {
    let names = new Queue();
    expect(names.toString()).toEqual("");
    names = new Queue(names_arr);
    expect(names.toString()).toEqual(names_arr.join("->"));
    expect(names.toString("-")).toEqual(names_arr.join("-"));
});

test("method -> clear: ", () => {
    let queue = new Queue();
    names_arr.forEach((name, index) => {
        expect(queue.empty).toBe(true);
        expect(queue.length).toBe(0);
        expect(queue.head).toBe(undefined);
        expect(queue.tail).toBe(undefined);
        queue.enqueue(name);
        expect(queue.empty).toBe(false);
        expect(queue.length).toBe(1);
        expect(queue.head).toBe(name);
        expect(queue.tail).toBe(name);
        queue.clear();
        expect(queue.empty).toBe(true);
        expect(queue.length).toBe(0);
        expect(queue.head).toBe(undefined);
        expect(queue.tail).toBe(undefined);
    });

    queue = new Queue(names_arr);
    expect(queue.empty).toBe(false);
    expect(queue.length).toBe(names_arr.length);
    expect(queue.head).toBe(names_arr[0]);
    expect(queue.tail).toBe(names_arr[names_arr.length - 1]);
    queue.clear();
    expect(queue.empty).toBe(true);
    expect(queue.length).toBe(0);
    expect(queue.head).toBe(undefined);
    expect(queue.tail).toBe(undefined);
});
