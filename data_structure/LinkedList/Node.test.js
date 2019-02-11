import Node from "./Node";

test("constructor: ", () => {
    // 不传参数时，内容为空
    let node = new Node();
    expect(node instanceof Node).toBe(true);
    expect("element" in node).toBe(true);
    expect(node.element).toBe(null);
    expect("next" in node).toBe(true);
    expect(node.next).toBe(null);

    // 传参数时
    node = new Node(0);
    expect(node.element).toBe(0);

    node = new Node(undefined);
    expect(node.element).toBe(null);

    node = new Node(null);
    expect(node.element).toBe(null);

    node = new Node(true);
    expect(node.element).toBe(true);

    node = new Node(false);
    expect(node.element).toBe(false);

    let obj = { name: "luwei" };
    node = new Node(obj);
    expect(node.element).toBe(obj);
});
