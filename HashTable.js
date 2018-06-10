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
  getPrevious(node) {
    const iterator = this.begin();
    let header = this.header.getNext();
    if (this.header.getNext() == node) {
      iterator.reset();
      return iterator;
    }
    let itemItr = iterator.next();
    while (!itemItr.done && itemItr.value.getNext() != node) {
      itemItr = iterator.next();
    }
    return iterator;
  }
  // Cost: O(n), O(1) at beginning
  erase(pos) {
    let curr = pos.current();
    if (!this.empty() && curr != null) {
      let result = curr.getNext();
      // Get Previous node is the most expensive part of this process
      let prev = this.getPrevious(curr).current();
      if (prev !== null) {
        prev.setNext(result);
        curr.setNext(null);
        return LListIterator[Symbol.iterator](result, this);
      }
    }
  }
  // Cost: O(n), O(1) at beginning
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
  // Cost: O(n)
  find(item) {
    const iterator = this.begin();
    let itemItr = {
      value: iterator.current(),
      done: false
    };
    while (!itemItr.done) {
      if (itemItr.value.getValue() === item) return iterator;
      itemItr = iterator.next();
    }
    return false;
  }
  // Cost: O(n)
  clear() {
    while (!this.empty()) {
      this.erase(this.begin());
    }
  }
  // Cost: O(1)
  empty() {
    return this.header.getNext() === null;
  }
  // Cost: O(1)
  begin() {
    return LListIterator[Symbol.iterator](this.header.getNext(), this);
  }
  // Cost: O(n)
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

  // Cost: O(n)
  clone(node) {
    if (node === null) return null;
    else return new LListNode(node.getValue(), this.clone(node.getNext()));
  }

  print() {
    const iterator = this.begin();
    let iterable = false;
    while (!iterable && iterator.current() !== null) {
      console.log(iterator.current().getValue());
      iterable = iterator.next().done;
    }
  }
}
// Iterator implementation
const LListIterator = {
  [Symbol.iterator]: (node, llist) => {
    let current = node;
    if (node === null) current = llist.header;
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
        current = llist.header;
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
    return this.elements === 0;
  }
  clear() {
    this.buckets.forEach(bucket => {
      bucket.clear();
    });
    this.elements = 0;
  }
  begin() {
    return HashTableIterator[Symbol.iterator](this);
  }
  insert(item) {
    if (this.find(item)) return;
    let pos = this.hashFunction(item);
    this.buckets[pos].push_back(item);
    this.elements++;
  }
  erase(item) {
    const pos = this.hashFunction(item);
    const list = this.buckets[pos];
    const itemToErase = list.find(item);
    itemToErase;
    if (itemToErase != list.end()) {
      list.erase(itemToErase);
      this.elements--;
    }
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

const HashTableIterator = {
  [Symbol.iterator]: table => {
    let currentBucket = 0;
    let listItr = 0;
    nextIterator = () => {
      console.log(listItr.current && listItr.current());
      listItr = 0;
      for (; currentBucket < table.size; currentBucket++) {
        // Pass the empty bucket
        if (table.buckets[currentBucket].empty()) continue;
        // Generate new iterator for the current position
        listItr = table.buckets[currentBucket].begin();

        return true;
      }
      currentBucket;
      return {
        done: true
      };
    };
    return {
      next: () => {
        // If we are in a bucket then we'll iterate through list iterator
        // But ,if that list has ended, then we should get the next iterator
        if (listItr && listItr.current().next !== null && listItr.next()) {
          return {
            value: listItr.current(),
            done: false
          };
        }
        currentBucket++;
        return nextIterator();
      },
      current: () => {
        if (listItr === 0)
          return {
            done: true
          };
        return {
          value: listItr.current(),
          done: false
        };
      },
      reset: () => {
        currentBucket = 0;
        nextIterator();
      },
      init: () => {
        nextIterator();
      }
    };
  }
};

let hTable = new HashTable(2);

hTable.insert(3);
hTable.insert(3);
hTable.insert(23);
hTable.insert(5);
hTable.insert({
  a: 1,
  b: 4
});
hTable.insert("a");

//let isit = hTable.find(3).current();
//isit;
//find not working
let a = hTable.buckets[0];
a;
hTable.erase(5);
const hItr = HashTableIterator[Symbol.iterator](hTable);
hItr.init();
console.log(hItr.current());
console.log(hItr.next() && hItr.current());
console.log(hItr.next() && hItr.current());
console.log(hItr.next() && hItr.current());
console.log(hItr.next() && hItr.current());
console.log(hItr.next() && hItr.current());
console.log(hItr.next() && hItr.current());
