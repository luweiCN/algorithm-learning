/**
 * @classdesc 队列的JavaScript实现
 * @class
 */
class Queue {
    /**
     * 创建Queue的实例
     * @param {*} [arr=[]] 参数可与为任意类型，但只有数组有效，其他类型等同于空数组
     * @constructor
     * @memberof Queue
     */
    constructor(arr = []) {
        /**
         * 队列底层数据结构
         * @member {Array}
         */
        this._dataSource = Array.isArray(arr) ? arr.slice() : [];
    }

    /**
     * 队列长度
     * @readonly
     * @memberof Queue
     * @type { Number }
     */
    get length() {
        return this._dataSource.length;
    }

    /**
     * @description 队列是否为空
     * @readonly
     * @type { Boolean }
     * @memberof Queue
     */
    get empty() {
        return this.length <= 0;
    }

    /**
     * 读取队首元素，队列为空时返回undefined
     * @readonly
     * @return { * }
     * @memberof Queue
     */
    get head() {
        return this._dataSource.length ? this._dataSource[0] : undefined;
    }

    /**
     * 读取队尾元素，队列为空时返回undefined
     * @readonly
     * @return { * }
     * @memberof Queue
     */
    get tail() {
        return this._dataSource.length
            ? this._dataSource[this.length - 1]
            : undefined;
    }

    /**
     * @description 方法向队尾添加一个元素
     * @param {*} el 要添加的元素
     * @memberof Queue
     */
    enqueue(el) {
        this._dataSource.push(el);
    }

    /**
     * @description 删除队首的元素
     * @returns {Any | undefined} 返回删除的元素，队列为空时返回undefined
     * @memberof Queue
     */
    dequeue() {
        return this._dataSource.shift();
    }

    /**
     * @description 显示队列的字符串形式
     * @param {string} [separator='->'] 指定连接队列的连接串
     * @returns {String} 队列字符串
     * @memberof Queue
     */
    toString(separator = "->") {
        return this._dataSource.join(separator);
    }

    /**
     * @description 清空队列
     * @memberof Queue
     */
    clear() {
        this._dataSource = [];
    }
}

export default Queue;
