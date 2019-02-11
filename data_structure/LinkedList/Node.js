/**
 * @classdesc 链表节点的JavaScript实现
 * @class Node
 */
class Node {
    /**
     * 创建Node的实例
     * @param {*} [element=null] 节点上需要保存的数据
     * @memberof Node
     */
    constructor(element = null) {
        this.element = element;
        this.next = null;
    }
}

export default Node;
