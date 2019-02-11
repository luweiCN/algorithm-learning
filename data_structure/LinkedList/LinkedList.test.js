import LinkedList from "./LinkedList";
import Node from "./Node";
import { Random } from "mockjs";

let names_arr = ["Clayton", "Raymond", "Cynthia", "Jennifer", "Bryan", "Danny"];

test("constructor: ", () => {
    let llist = new LinkedList();
    expect("head" in llist).toBe(true);
    expect(llist.head instanceof Node).toBe(true);
    expect("element" in llist.head).toBe(true);
    expect(llist.head.element.toString()).toBe("Symbol(head)");
});

test("method -> insert: ", () => {
    let llist = new LinkedList();
    expect(llist.toString()).toEqual("");
    // 顺序插入，不传入第二个参数
    names_arr.forEach((item, index) => {
        llist.insert(item);
    });

    expect(llist.head.next.element).toEqual(names_arr[0]);

    expect(llist.head.next.next.element).toEqual(names_arr[1]);

    expect(llist.head.next.next.next.element).toEqual(names_arr[2]);

    expect(llist.head.next.next.next.next.element).toEqual(names_arr[3]);

    expect(llist.head.next.next.next.next.next.element).toEqual(names_arr[4]);

    expect(llist.head.next.next.next.next.next.next.element).toEqual(
        names_arr[5]
    );
    expect(llist.head.next.next.next.next.next.next.next).toBe(null);

    // 随机插入，传入第二个参数
    let order = Random.shuffle(Random.range(names_arr.length));
    llist = new LinkedList();
    order.forEach((index, i) => {
        if (i === 0) {
            llist.insert(names_arr[index]);
        } else {
            llist.insert(names_arr[index], names_arr[order[i - 1]]);
        }
    });

    expect(llist.head.next.element).toEqual(names_arr[order[0]]);

    expect(llist.head.next.next.element).toEqual(names_arr[order[1]]);

    expect(llist.head.next.next.next.element).toEqual(names_arr[order[2]]);

    expect(llist.head.next.next.next.next.element).toEqual(names_arr[order[3]]);

    expect(llist.head.next.next.next.next.next.element).toEqual(
        names_arr[order[4]]
    );

    expect(llist.head.next.next.next.next.next.next.element).toEqual(
        names_arr[order[5]]
    );
    expect(llist.head.next.next.next.next.next.next.next).toBe(null);
});

test("method -> find: ", () => {
    let llist = new LinkedList();
    expect(llist.find(Symbol())).toBe(llist.head);
    names_arr.forEach((item, index) => {
        let node = llist.find(item);
        if (index === 0) {
            expect(node).toBe(llist.head);
            llist.insert(item);
        } else {
            expect(node).toEqual(new Node(names_arr[index - 1]));
            llist.insert(item);
        }
        expect(llist.find(item)).toEqual(new Node(item));
    });
    expect(llist.find(Symbol())).toEqual(
        new Node(names_arr[names_arr.length - 1])
    );
});

test("method -> toString: ", () => {
    let llist = new LinkedList();
    expect(llist.toString()).toEqual("");
    names_arr.forEach((item, index) => {
        llist.insert(item);
        expect(llist.toString()).toBe(names_arr.slice(0, index + 1).join("->"));
        expect(llist.toString("-")).toBe(
            names_arr.slice(0, index + 1).join("-")
        );
        expect(llist.toString(">")).toBe(
            names_arr.slice(0, index + 1).join(">")
        );
    });
});

test("iterator -> for...of: ", () => {
    let llist = new LinkedList();
    expect(llist.toString()).toEqual("");
    // 顺序插入，不传入第二个参数
    names_arr.forEach(item => {
        llist.insert(item);
    });
    let i = 0;
    for (let node of llist) {
        expect(node.element).toEqual(names_arr[i++]);
    }
});

test("method -> findPrevious: ", () => {
    let llist = new LinkedList();
    expect(llist.toString()).toEqual("");
    names_arr.forEach((item, index) => {
        llist.insert(item);
        if (index >= 1) {
            expect(llist.findPrevious(item).element).toEqual(
                names_arr[index - 1]
            );
        } else {
            expect(llist.findPrevious(item).element.toString()).toBe(
                "Symbol(head)"
            );
        }
    });
});

test("method -> findPrevious: ", () => {
    let llist = new LinkedList();
    names_arr.forEach((item, index) => {
        llist.insert(item);
        if (index >= 1) {
            expect(llist.findPrevious(item).element).toEqual(
                names_arr[index - 1]
            );
        } else {
            expect(llist.findPrevious(item).element.toString()).toBe(
                "Symbol(head)"
            );
        }
    });
});

test("method -> remove: ", () => {
    names_arr.forEach((item, index) => {
        let llist = new LinkedList();
        names_arr.forEach(item => llist.insert(item));
        llist.remove(item);
        if (index === 0) {
            expect(llist.head.next.element).toEqual(names_arr[index + 1]);
        } else if (index === names_arr.length - 1) {
            let node = llist.find(names_arr[index - 1]);
            expect(node.next).toBe(null);
        } else {
            let node = llist.find(names_arr[index - 1]);
            expect(node.next.element).toEqual(names_arr[index + 1]);
        }
    });
});
