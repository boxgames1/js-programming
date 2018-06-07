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
  getPrevious(node) {
    const iterator = LListIterator[Symbol.iterator](this);
    let itemItr = iterator.next();
    while (!itemItr.done && itemItr.value.getNext() != node) {
      itemItr = iterator.next();
    }
    return iterator;
  }
  erase(pos) {
    let prev = pos.current().value;
    // Can not erase the header
    if (prev !== null) {
      prev = this.getPrevious(prev);
      const next = pos.current().value.getNext();
      pos.next();
      prev.current().value.setNext(next);
      return pos;
    }
  }
  insert(pos, val) {
    const newNode = new LListNode(val, pos.current().value.getNext());
    pos.current().value.setNext(newNode);
    pos.next();
    return pos;
  }
  push_back(item) {
    const last = this.getLastItem();
    this.insert(last, item);
  }
  find(item) {
    const iterator = LListIterator[Symbol.iterator](this);
    let itemItr = iterator.next();
    while (!itemItr.done) {
      if (itemItr.value.getValue() == item) return iterator;
      itemItr = iterator.next();
    }
    return false;
  }
  getLastItem() {
    const iterator = LListIterator[Symbol.iterator](this);
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

  print() {
    const iterator = LListIterator[Symbol.iterator](this);
    let item;
    item = iterator.next();
    while (!item.done) {
      console.log(item.value.getValue());
      item = iterator.next();
    }
  }
}

const LListIterator = {
  [Symbol.iterator]: llist => {
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
hTable.insert({ a: 1, b: 4 });

let isit = hTable.find(3).current();
isit;
//find not working
let a = hTable.buckets[1];
a;
