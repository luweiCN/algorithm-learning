class List {
    constructor(arr = []) {
        this._dataSource = Array.isArray(arr) ? arr.slice() : []; // 列表
        this._pos; // 列表的当前位置
        this.pos = 0; // 设置列表当前位置为0
    }

    /**
     * Properties
     */

    // 列表的元素个数
    get size() {
        return this._dataSource.length;
    }

    get pos() {
        return this._pos;
    }

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
            return this._pos;
        }
    }

    [Symbol.iterator] = this.values;

    /**
     * Methods
     */

    // 返回列表中元素的个数
    length = () => this.size;

    // 清空列表中的所有元素
    clear = () => {
        this._dataSource = [];
        this.front();
    };

    /**
     * @description 在列表的末尾添加新元素
     * @memberof List
     */
    append = el => this._dataSource.push(el);

    /**
     * @description 在列表中查找el第一次出现的位置，找不到时返回-1
     * @memberof List
     */
    find = el => this._dataSource.indexOf(el);

    /**
     * @description 删除列表中的第一个el，成功返回true，失败返回false
     * @memberof List
     */
    remove = el => {
        const pos = this.find(el);
        if (pos === -1) {
            return false;
        } else {
            this._dataSource.splice(pos, 1);
            return true;
        }
    };

    // 返回当前列表的字符串形式，元素之间用逗号连接
    toString = () => this._dataSource.join(",");

    /**
     * 把el插入到pos处
     * @param {*} el
     * @param {*} pos
     */
    insert = (el, pos = this.pos) => {
        if (!Number.isInteger(pos) || pos < 0 || pos > this.size) {
            return false;
        } else {
            this._dataSource.splice(pos, 0, el);
            return true;
        }
    };

    /**
     * 判断元素是否在列表中，存在返回true，不存在返回false
     * @param {*} el
     */
    contains = el => this.find(el) !== -1;

    // 将列表的当前位置设移动到第一个元素
    front = () => (this.pos = 0);

    // 将列表的当前位置移动到最后一个元素
    end = () => (this.pos = this.size - 1);

    // 将当前位置前移一位
    prev = () => --this.pos;

    // 将当前位置后移一位
    next = () => ++this.pos;

    // 返回当前位置的索引
    currPos = () => this.pos;

    // 移动的指定的位置
    moveTo = position => (this.pos = position);

    // 返回当前位置对应的元素
    getElement = () => this._dataSource[this.pos];

    // 值的迭代器
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
