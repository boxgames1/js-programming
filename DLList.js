//Double Linked List data Structure with ES5 class style

//Needs a value, prev and next node
class DLListNode {
  constructor(prev, value, next) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
  getNext() {
    return this.next;
  }
  setNext(next) {
    this.next = next;
  }
  getPrev() {
    return this.prev;
  }
  setPrev(prev) {
    this.prev = prev;
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
}
//Needs an array of values
class DLList {
  constructor(values) {
    let current;
    this.header = new DLListNode(null, null, null);
    this.tail = new DLListNode(this.header, null, null);
    this.header.setNext(this.tail);
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
        return DLListIterator[Symbol.iterator](result, this);
      }
    }
  }
  // Cost: O(n), O(1) at beginning
  insert(pos, val) {
    const newNode = new DLListNode(pos.current(), val, pos.current().getNext());
    pos.current().setNext(newNode);
    pos
      .current()
      .getNext()
      .setPrev(newNode);
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
    return this.header.getNext() === this.tail;
  }
  // Cost: O(1)
  begin() {
    return DLListIterator[Symbol.iterator](this.header.getNext(), this);
  }
  // Cost: O(1)
  end() {
    return DLListIterator[Symbol.iterator](this.tail.getPrev(), this);
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
const DLListIterator = {
  [Symbol.iterator]: (node, dllist) => {
    let current = node;
    if (node === null) current = dllist.header;
    return {
      next: () => {
        if (
          current === null ||
          current.getNext() === null ||
          current === dllist.tail ||
          current.getNext() === dllist.tail
        ) {
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
      prev: () => {
        if (
          current === null ||
          current.getPrev() === null ||
          current === dllist.header ||
          current.getPrev() === dllist.header
        ) {
          return {
            done: true
          };
        }
        current = current.getPrev();
        return {
          value: current,
          done: false
        };
      },
      current: () => {
        return current;
      },
      reset: () => {
        current = dllist.header;
      },
      reset_back: () => {
        current = dllist.tail;
      }
    };
  }
};

// Usage
const list = new DLList();
const itr = DLListIterator[Symbol.iterator](null, list);
itr.reset();
list.insert(itr, 2);
console.log(list);
