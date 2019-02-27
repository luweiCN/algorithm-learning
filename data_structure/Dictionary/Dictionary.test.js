import Dictionary from "./Dictionary";

test("method -> add: ", () => {
    let me = new Dictionary();
    me.add("name", "luwei");
    me.add("sex", "male");
    me.add("age", 25);
    expect(me._dataSource["name"]).toBe("luwei");
    expect(me._dataSource["sex"]).toBe("male");
    expect(me._dataSource["age"]).toBe(25);
    expect(me._dataSource["school"]).toBe(undefined);
    expect("school" in me._dataSource).toBe(false);
});

test("property -> size: ", () => {
    let me = new Dictionary();
    expect(me.size).toBe(0);
    me.add("name", "luwei");
    expect(me.size).toBe(1);
    me.add("sex", "male");
    expect(me.size).toBe(2);
    me.add("age", 25);
    expect(me.size).toBe(3);
});

test("method -> clear: ", () => {
    let me = new Dictionary();
    me.add("name", "luwei");
    me.add("sex", "male");
    me.add("age", 25);
    me.clear();
    expect(me.size).toBe(0);

    expect(me._dataSource["name"]).toBe(undefined);
    expect("name" in me._dataSource).toBe(false);

    expect(me._dataSource["sex"]).toBe(undefined);
    expect("sex" in me._dataSource).toBe(false);

    expect(me._dataSource["age"]).toBe(undefined);
    expect("age" in me._dataSource).toBe(false);
});

test("method -> find: ", () => {
    let me = new Dictionary();
    expect(me.find("name")).toBe(undefined);
    me.add("name", "luwei");
    expect(me.find("name")).toBe("luwei");
    expect(me.find("name")).toBe(me._dataSource["name"]);

    expect(me.find("undefined")).toBe(undefined);
    me.add("undefined", undefined);
    expect(me.find("undefined")).toBe(undefined);
    expect(me.find("undefined")).toBe(me._dataSource["undefined"]);
});

test("method -> remove: ", () => {
    let me = new Dictionary();
    me.add("name", "luwei");
    me.remove("name");
    expect(me.find("undefined")).toBe(undefined);
    expect(me.size).toBe(0);
});

test("method -> toString: ", () => {
    let me = new Dictionary();
    expect(me.toString()).toBe("{  }");
    me.add("name", "luwei");
    expect(me.toString()).toBe("{ name: luwei }");
    me.add("sex", "male");
    expect(me.toString()).toBe("{ name: luwei, sex: male }");
    me.add("age", 25);
    expect(me.toString()).toBe("{ name: luwei, sex: male, age: 25 }");
});

test("method -> contains: ", () => {
    let me = new Dictionary();
    expect(me.contains("name")).toBe(false);
    me.add("name", "luwei");
    expect(me.contains("name")).toBe(true);

    expect(me.contains("sex")).toBe(false);
    me.add("sex", "male");
    expect(me.contains("sex")).toBe(true);

    expect(me.contains("age")).toBe(false);
    me.add("age", 25);
    expect(me.contains("age")).toBe(true);

    expect(me.contains("undefined")).toBe(false);
    me.add("undefined", undefined);
    expect(me.contains("undefined")).toBe(true);
});

test("iterator -> for...of: ", () => {
    let me = new Dictionary();
    me.add("name", "luwei");
    me.add("sex", "male");
    me.add("age", 25);
    me.add("undefined", undefined);

    let i = 0;
    let result = [
        { key: "name", value: "luwei" },
        { key: "sex", value: "male" },
        { key: "age", value: 25 },
        { key: "undefined", value: undefined }
    ];
    for (let item of me) {
        expect(item).toEqual(result[i++]);
    }
});
