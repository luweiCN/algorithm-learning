import Node from "./Node";

const head = Symbol("head");

/**
 * @classdesc 链表的JavaScript实现
 * @class
 */
class LinkedList {
    /**
     * 创建LinkedList的实例，链表只需要一个属性来保存头结点
     * @memberof LinkedList
     */
    constructor() {
        this.head = new Node(head);
    }

    /**
     * 查找存储给定元素的节点（在链表上移动的方式，当未找到时，返回最后一个节点）
     * @param {*} item 需要查找的元素
     * @returns { Node } Node类型的节点
     * @memberof LinkedList
     */
    find(item) {
        let currentNode = this.head;
        while (
            currentNode &&
            currentNode.next &&
            currentNode.element !== item
        ) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    /**
     * 在链表中存储 item 的节点后插入存储 newElement 的节点(若item不存在于链表，则把newElement插入到链表最后)
     * @param {*} newElement 要插入的元素
     * @param {*} item 要插入在该元素的后面，默认为head(Symbol类型),表示头节点
     * @memberof LinkedList
     */
    insert(newElement, item) {
        let newNode = new Node(newElement);
        let currentNode = this.find(item);
        newNode.next = currentNode.next;
        currentNode.next = newNode;
    }

    /**
     * 链表的默认迭代器，使其支持 for...of 循环
     * @memberof LinkedList
     */
    *[Symbol.iterator]() {
        let currentNode = this.head;
        while (currentNode.next !== null) {
            yield currentNode.next;
            currentNode = currentNode.next;
        }
    }

    /**
     * @description 显示链表的字符串形式
     * @param {string} [separator='->'] 指定连接链表的连接串
     * @returns {String} 链表字符串
     * @memberof LinkedList
     */
    toString(separator = "->") {
        let linkList = [];
        for (let item of this) {
            linkList.push(item.element);
        }
        return linkList.join(separator);
    }

    /**
     * @description 根据元素查找该元素对应节点的前一个节点（当该节点不存在时，返回最后一个节点）
     * @param { * } 要查找的元素
     * @returns { Node } Node类型的节点
     * @memberof LinkedList
     */
    findPrevious(item) {
        let previousNode = this.head;
        while (previousNode.next && previousNode.next.element !== item) {
            previousNode = previousNode.next;
        }
        return previousNode;
    }

    /**
     * @description 根据元素删除对应节点
     * @param { * } 要删除的元素
     * @returns { Boolean } 成功返回true，失败返回false
     * @memberof LinkedList
     */
    remove(item) {
        let previousNode = this.findPrevious(item);
        if (previousNode.next !== null) {
            previousNode.next = previousNode.next.next;
            return true;
        }
        return false;
    }
}

export default LinkedList;
