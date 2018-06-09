class LListNode {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
    getNext() {
        return this.next;
    }
    getValue() {
        return this.value;
    }
    setNext(next) {
        this.next = next;
    }
    setValue(value) {
        this.value = value;
    }
}
//Needs an array of values
class LList {
    constructor(values) {
        let current;
        this.header = new LListNode(null, null);
        current = this.header;
        for (const [index, value] of values.entries()) {
            let newNode = new LListNode(value, null);
            current.setNext(newNode);
            current = newNode;
        }
    }
    getHeader() {
        return this.header;
    }
    getPrevious(node) {
        const iterator = this.begin()
        let header = this.getHeader().getNext()
        if (this.getHeader().getNext() == node) {
            iterator.reset();
            return iterator;
        }
        let itemItr = iterator.next();
        while (!itemItr.done && itemItr.value.getNext() != node) {
            itemItr = iterator.next();
        }
        return iterator;
    }
    erase(pos) {
        let curr = pos.current()
        if (!this.empty() && curr != null) {
            let result = curr.getNext()
            let prev = this.getPrevious(curr).current()
            if (prev !== null) {
                prev.setNext(result)
                return LListIterator[Symbol.iterator](result, this);
            }
        }
    }
    insert(pos, val) {
        const newNode = new LListNode(val, pos.current().getNext());
        pos.current().setNext(newNode);
        pos.next();
        return pos;
    }
    push_back(item) {
        const last = this.end();
        this.insert(last, item);
    }
    find(item) {
        const iterator = this.begin()
        let itemItr = iterator.next();
        while (!itemItr.done) {
            if (itemItr.value.getValue() == item) return iterator;
            itemItr = iterator.next();
        }
        return false;
    }
    clear() {
        while (!this.empty()) {
            this.erase(this.begin())
        }
    }
    empty() {
        return this.getHeader().getNext() === null;
    }
    begin() {
        const iterator = LListIterator[Symbol.iterator](this.getHeader().getNext(), this);
        return iterator;
    }
    end() {
        const iterator = this.begin();
        let item = iterator.next();
        if (!item.value) {
            iterator.reset();
            return iterator;
        }
        while (item.value && item.value.getNext() != null) {
            item = iterator.next();
        }
        return iterator;
    }

    clone(node) {
        if (node === null)
            return null
        else
            return new LListNode(node.getValue(), this.clone(node.getNext()))
    }

    print() {
        const iterator = this.begin()
        let item;
        item = iterator.next();
        while (!item.done) {
            console.log(item.value.getValue());
            item = iterator.next();
        }
    }
}

const LListIterator = {
    [Symbol.iterator]: (node, llist) => {
        let current = node;
        return {
            next: () => {
                if (current === null || current.getNext() === null) {
                    return {
                        done: true
                    };
                }
                current = current.getNext();
                return {
                    value: current,
                    done: false
                };
            },
            current: () => {
                return current;
            },
            reset: () => {
                current = llist.getHeader();
            }
        };
    }
};

class HashTable {
    constructor(size) {
        this.elements = 0;
        this.size = size;
        this.buckets = [];
        for (let i = 0; i < size; i++) {
            this.buckets.push(new LList([]));
        }
    }
    empty() {
        return this.elements === 0
    }
    clear() {
        this.buckets.forEach(bucket => {
            bucket.clear();
        });
        this.elements = 0;
    }
    begin() {

    }
    end() {

    }
    insert(item) {
        if (this.find(item)) return;
        let pos = this.hashFunction(item);
        this.buckets[pos].push_back(item);
        this.elements++;
    }
    erase(item) {
        let pos = this.hashFunction(item);
        this.buckets[pos].erase(item);
        this.elements--;
    }
    find(item) {
        let pos = this.hashFunction(item);
        return this.buckets[pos].find(item);
    }
    hashFunction(item) {
        let len = JSON.stringify(item).length;
        return len % this.size;
    }
}

// TODO
const HashTableIterator = {
    [Symbol.iterator]: table => {
        let currentBucket = 0;
        return {
            next: () => {
                currentBucket++;
                if (currentBucket === null) {
                    return {
                        done: true
                    };
                }
                return {
                    value: current,
                    done: false
                };
            },
            current: () => {
                return {
                    value: current,
                    done: false
                };
            },
            reset: () => {
                currentBucket = 0;
            }
        };
    }
};

let hTable = new HashTable(2);

hTable.insert(3);
hTable.insert(3);
hTable.insert(5);
hTable.insert({
    a: 1,
    b: 4
});

let isit = hTable.find(3).current();
isit;
//find not working
let a = hTable.buckets[1];
a;