/**
 * @classdesc 字典的JavaScript实现
 * @class
 */
class Dictionary {
    /**
     * 创建Stack的实例
     * @constructor
     * @memberof Dictionary
     */
    constructor() {
        /**
         * 字典的底层数据结构
         * @member {Array}
         */
        this._dataSource = new Array();
    }

    /**
     * 字典的元素个数
     * @readonly
     * @memberof Dictionary
     */
    get size() {
        return Object.keys(this._dataSource).length;
    }

    /**
     * 字典的默认迭代器，会按照字典元素的添加顺序显示
     * @memberof Dictionary
     */
    [Symbol.iterator] = this.values;

    /**
     * 清空字典中的所有元素
     * @memberof Dictionary
     */
    clear() {
        this._dataSource = new Array();
    }

    /**
     * 该方法接受两个参数：键和值。键是值在字典中的索引
     * @param {Number | String} key 键
     * @param {*} value 值
     * @memberof Dictionary
     */
    add(key, value) {
        this._dataSource[key] = value;
    }

    /**
     *  该方法以键作为参数，返回和其关联的值
     * @param {Number | String} key
     * @returns {*} 返回和键关联的值
     * @memberof Dictionary
     */
    find(key) {
        return this._dataSource[key];
    }

    /**
     * 同时删掉键和与其关联的值
     * @param {*} key 要删除的键
     * @memberof Dictionary
     */
    remove(key) {
        delete this._dataSource[key];
    }

    /**
     * 字典的字符串形式
     * @memberof Dictionary
     */
    toString() {
        let strArr = [];
        for (let key of Object.keys(this._dataSource)) {
            strArr.push(`${key}: ${this._dataSource[key]}`);
        }
        return `{ ${strArr.join(", ")} }`;
    }

    /**
     * 判断字典中是否存在key键，存在返回true，不存在返回false
     * @param {*} key
     * @memberof Dictionary
     */
    contains(key) {
        return Object.keys(this._dataSource).includes(key);
    }

    /**
     * 值的迭代器
     * @generator
     * @memberof Dictionary
     * @yields Dictionary元素
     */
    *values() {
        for (let key of Object.keys(this._dataSource)) {
            yield { key, value: this._dataSource[key] };
        }
    }
}

export default Dictionary;
