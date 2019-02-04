/**
 * @classdesc 栈的JavaScript实现
 * @class
 */
class List {
    /**
     * 创建Stack的实例
     * @param {*} [arr=[]] 参数可与为任意类型，但只有数组有效，其他类型等同于空数组
     * @constructor
     * @memberof List
     */
    constructor(arr = []) {
        /**
         * 列表的底层数据结构
         * @member {Array}
         */
        this._dataSource = Array.isArray(arr) ? arr.slice() : [];
        /**
         * 列表当前位置(私有变量)
         * @member {Number}
         */
        this._pos = 0; // 列表的当前位置
    }

    /**
     * 列表的元素个数
     * @readonly
     * @memberof List
     */
    get size() {
        return this._dataSource.length;
    }

    /**
     * 列表当前位置
     * @memberof List
     */
    get pos() {
        return this._pos;
    }

    /**
     * 列表当前位置
     * @memberof List
     */
    set pos(position) {
        if (!Number.isInteger(position)) {
            throw new TypeError("position must be integer");
        } else if (
            position < 0 ||
            (this.size > 0 && position >= this.size) ||
            (this.size === 0 && position !== 0)
        ) {
            throw new TypeError("position overflow the range of the List");
        } else {
            this._pos = position;
        }
    }

    /**
     * 列表的默认迭代器
     * @memberof List
     */
    [Symbol.iterator] = this.values;

    /**
     * 返回列表中元素的个数
     * @memberof List
     * @return {Number}
     */
    length() {
        return this.size;
    }

    /**
     * 清空列表中的所有元素
     * @memberof List
     */
    clear() {
        this._dataSource = [];
        this.front();
    }

    /**
     * 在列表的末尾添加新元素
     * @param {*} el 要添加的元素
     * @memberof List
     */
    append(el) {
        this._dataSource.push(el);
    }

    /**
     * 在列表中查找el第一次出现的位置，找不到时返回-1
     * @param {*} el 要查找的元素
     * @returns {Number}
     * @memberof List
     */
    find(el) {
        return this._dataSource.indexOf(el);
    }

    /**
     * 在列表中查找el出现的位置
     * @param {*} el 要查找的元素
     * @param {boolean} [type=true] 是否要类型一致，默认为一致
     * @returns {Array}
     * @memberof List
     */
    findAll(el, type = true) {
        return this._dataSource
            .map((item, index) => {
                if (type && item === el) {
                    return index;
                }
                if (!type && item == el) {
                    return index;
                }
            })
            .filter(t => t !== undefined);
    }

    /**
     * 删除列表中的第一个el
     * @param {*} el 要删除的元素
     * @returns {Boolean} 删除成功返回true，失败返回false，删除失败包括el不存在于List内的情况
     * @memberof List
     */
    remove(el) {
        const pos = this.find(el);
        if (pos === -1) {
            return false;
        } else {
            this._dataSource.splice(pos, 1);
            return true;
        }
    }

    /**
     *  删除列表中所有的el
     * @param {*} el 要删除的元素
     * @param {boolean} [type=true] 是否要类型一致，默认为一致
     * @memberof List
     */
    removeAll(el, type = true) {
        this._dataSource = type
            ? this._dataSource.filter(item => item !== el)
            : this._dataSource.filter(item => item != el);
    }

    /**
     * @description 列表的字符串形式
     * @param {string} [separator=','] 指定连接列表的字符串
     * @returns {String} 列表字符串
     * @memberof Queue
     */
    toString(separator = ",") {
        return this._dataSource.join(separator);
    }

    /**
     * 把el插入到pos处
     * @param {*} el 要插入的元素
     * @param {Number} [pos=this.pos] 要插入的位置
     * @returns {Boolean} 插入成功返回true, 插入失败返回false
     * @memberof List
     */
    insert(el, pos = this.pos) {
        if (!Number.isInteger(pos) || pos < 0 || pos > this.size) {
            return false;
        } else {
            this._dataSource.splice(pos, 0, el);
            return true;
        }
    }

    /**
     * 判断元素是否在列表中，存在返回true，不存在返回false
     * @param {*} el 待判断的匀速
     * @returns {Boolean}
     * @memberof List
     */
    contains(el) {
        return this.find(el) !== -1;
    }

    /**
     * 将列表的当前位置设移动到第一个元素
     * @memberof List
     */
    front() {
        this.pos = 0;
    }

    /**
     * 将列表的当前位置移动到最后一个元素
     * @memberof List
     */
    end() {
        this.pos = this.size - 1;
    }

    /**
     * 将当前位置前移一位
     * @memberof List
     */
    prev() {
        --this.pos;
    }

    /**
     * 将当前位置后移一位
     * @memberof List
     */
    next() {
        ++this.pos;
    }

    /**
     * 返回当前位置的索引
     * @memberof List
     */
    currPos() {
        return this.pos;
    }

    /**
     * 移动的指定的位置
     * @param {*} position
     * @memberof List
     */
    moveTo(position) {
        this.pos = position;
    }

    /**
     * 返回当前位置对应的元素
     * @returns {Any} 元素
     * @memberof List
     */
    getElement() {
        return this._dataSource[this.pos];
    }

    /**
     * 值的迭代器
     * @generator
     * @memberof List
     * @yields List元素
     */
    *values() {
        this.front();
        while (this.currPos() < this.size) {
            yield this.getElement();
            try {
                this.next();
            } catch (e) {
                return;
            }
        }
    }
}

export default List;
