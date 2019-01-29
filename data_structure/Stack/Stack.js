/**
 * @classdesc 栈的JavaScript实现
 * @class
 */
class Stack {
    /**
     * 创建Stack的实例
     * @param {*} [arr=[]] 参数可与为任意类型，但只有数组有效，其他类型等同于空数组
     * @constructor
     * @memberof Stack
     */
    constructor(arr = []) {
        /**
         * 栈底层数据结构
         * @member {Array}
         */
        this._dataSource = Array.isArray(arr) ? arr.slice() : [];
    }

    /**
     * 栈长
     * @readonly
     * @memberof Stack
     * @type { Number }
     */
    get length() {
        return this._dataSource.length;
    }

    /**
     * 栈顶,栈为空时top为-1
     * @readonly
     * @type { Number }
     * @memberof Stack
     */
    get top() {
        return this._dataSource.length - 1;
    }

    /**
     * @description 栈是否为空
     * @readonly
     * @type { Boolean }
     * @memberof Stack
     */
    get empty() {
        return this.length <= 0;
    }

    /**
     * @description 入栈
     * @param {*} el 入栈元素
     * @memberof Stack
     */
    push(el) {
        this._dataSource.push(el);
    }

    /**
     * @description 出栈
     * @returns {Any | undefined} 返回出栈的元素，栈为空时返回undefined
     * @memberof Stack
     */
    pop() {
        return this._dataSource.pop();
    }

    /**
     * @description 查看栈顶元素
     * @returns {Any | undefined} 返回栈顶元素，栈为空时返回undefined
     * @memberof Stack
     */
    peak() {
        return this.top !== -1 ? this._dataSource[this.top] : undefined;
    }

    /**
     * @description 清空栈
     * @memberof Stack
     */
    clear() {
        this._dataSource = [];
    }
}

export default Stack;
