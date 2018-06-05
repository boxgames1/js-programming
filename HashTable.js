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
    push_back(item) {
        const last = this.getLastItem();
        const newItem = new LListNode(item, null);
        last.setNext(newItem);
    }
    find(item) {
        const iterator = LListIterator[Symbol.iterator](this);
        let itemItr = iterator.next()
        while (!itemItr.done) {
            if (itemItr.value.getValue() == item) return iterator;
            itemItr = iterator.next();
        }
        return false;
    }
    getLastItem() {
        const iterator = LListIterator[Symbol.iterator](this);
        let item = iterator.next()
        while (item.value && item.value.getNext() != null) {
            item = iterator.next();
        }
        return item.value;
    }
}

const LListIterator = {
    [Symbol.iterator]: (llist) => {
        let current = llist.getHeader();
        return {
            next: () => {
                current = current.getNext();
                if (current === null) {
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
            }
        };
    }
};

class HashTable {
    constructor(size) {
        this.elements = 0;
        this.size = size;
        this.buckets = []
        for (let i = 0; i < size; i++) {
            this.buckets.push(new LList([]));
        }
    }
    insert(item) {
        if (!find(item)) return;
        let pos = this.hashFunction(item);
        this.buckets[pos].push_back(item);
        elements++;
    }
    erase(item) {
        let pos = this.hashFunction(item);
        this.buckets[pos].erase(item);
        elements--;
    }
    find(item) {
        let pos = this.hashFunction(item);
        return buckets[pos].find(item);
    }
    hashFunction(item) {
        return item.length % this.size;
    }
}