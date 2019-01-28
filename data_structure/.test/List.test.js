import List from "../List";

let names_arr = ["Clayton", "Raymond", "Cynthia", "Jennifer", "Bryan", "Danny"];

test("constructor: ", () => {
    // 不传参数时，列表为空
    let names = new List();
    expect(names.pos).toBe(0);
    expect(names._pos).toBe(0);
    expect(names.size).toBe(0);

    // 传入一个数组时，会把数组中所有的元素去重加入List
    names = new List(names_arr);
    expect(names.size).toBe(names_arr.length);

    names_arr.forEach(name => {
        expect(names._dataSource).toContain(name);
    });
    expect(names._pos).toBe(0);
    expect(names.pos).toBe(0);

    // 传入一个非数组元素时，等同于传入空数组
    names = new List("1");
    expect(names.size).toBe(0);
    expect(names._pos).toBe(0);
    expect(names.pos).toBe(0);
});

test("property -> size and method -> length: ", () => {
    let names = new List();
    names_arr.forEach((name, index) => {
        expect(names.size).toBe(index);
        expect(names.length()).toBe(index);
        names.append(name);
        expect(names.size).toBe(index + 1);
        expect(names.length()).toBe(index + 1);
    });
});

test("method -> clear: ", () => {
    let names = new List(names_arr);
    expect(names.size).toBe(names_arr.length);
    names.clear();
    expect(names.size).toBe(0);
});

test("method -> append: ", () => {
    let names = new List();
    names_arr.forEach(name => {
        expect(names._dataSource).not.toContain(name);
        names.append(name);
        expect(names._dataSource).toContain(name);
    });
});

test("method -> find: ", () => {
    let names = new List();
    names_arr.forEach(name => {
        expect(names.find(name)).toEqual(-1);
    });

    names = new List(names_arr);
    names_arr.forEach((name, index) => {
        expect(names.find(name)).toEqual(index);
    });
});

test("method -> remove: ", () => {
    let names = new List();
    names_arr.forEach(name => {
        expect(names.remove(name)).toEqual(false);
    });

    names = new List(names_arr);
    names_arr.forEach(name => {
        expect(names.find(name)).not.toEqual(-1);
        expect(names.remove(name)).toEqual(true);
        expect(names.find(name)).toEqual(-1);
    });
});
test("method -> remove: ", () => {
    let names = new List();
    names_arr.forEach(name => {
        expect(names.remove(name)).toEqual(false);
    });

    names = new List(names_arr);
    names_arr.forEach(name => {
        expect(names.find(name)).not.toEqual(-1);
        expect(names.remove(name)).toEqual(true);
        expect(names.find(name)).toEqual(-1);
    });
});

test("method -> toString: ", () => {
    let names = new List();
    expect(names.toString()).toEqual("");
    names = new List(names_arr);
    expect(names.toString()).toEqual(names_arr.toString());
});

test("method -> insert: ", () => {
    let names = new List(names_arr.slice(0, 3));
    expect(names.find(names_arr[3])).toEqual(-1);
    expect(names.insert(names_arr[3], 1.3)).toEqual(false);
    expect(names.insert(names_arr[3], -1)).toEqual(false);
    expect(names.insert(names_arr[3], 100)).toEqual(false);

    expect(names.find(names_arr[3])).toEqual(-1);
    expect(names.insert(names_arr[3])).toEqual(true);
    expect(names.find(names_arr[3])).toEqual(0);

    expect(names.find(names_arr[4])).toEqual(-1);
    expect(names.insert(names_arr[4], 2)).toEqual(true);
    expect(names.find(names_arr[4])).toEqual(2);
});

test("method -> contains: ", () => {
    let names = new List();
    names_arr.forEach(name => {
        expect(names.contains(name)).toEqual(false);
    });

    names = new List(names_arr);
    names_arr.forEach(name => {
        expect(names.contains(name)).toEqual(true);
    });
});

test("method -> front, end, prev, next, currPos, moveTo, getElement: ", () => {
    let names = new List(names_arr);
    expect(names.currPos()).toEqual(0);
    expect(names.getElement()).toEqual(names_arr[0]);
    expect(names.prev).toThrowError();
    names.next();
    expect(names.currPos()).toEqual(1);
    expect(names.getElement()).toEqual(names_arr[1]);
    names.moveTo(4);
    expect(names.currPos()).toEqual(4);
    expect(names.getElement()).toEqual(names_arr[4]);

    names.end();
    expect(names.currPos()).toEqual(names_arr.length - 1);
    expect(names.getElement()).toEqual(names_arr[names_arr.length - 1]);
    expect(names.next).toThrowError();
});

test("method *values and property Symbol.iterator : ", () => {
    let names_list = new List(names_arr);
    expect(names_list.values === names_list[Symbol.iterator]).toEqual(true);

    let names = names_list.values();
    names_arr.forEach(name => {
        let next = names.next();
        expect(next.done).toEqual(false);
        expect(next.value === name).toEqual(true);
    });

    let end1 = names.next();
    expect(end1.done).toEqual(true);
    expect(end1.value).toBeUndefined();

    let end2 = names.next();
    expect(end2.done).toEqual(true);
    expect(end2.value).toBeUndefined();
});
