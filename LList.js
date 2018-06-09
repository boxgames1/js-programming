//Linked List data Structure with ES5 class style

//Needs a value and next node
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
    const iterator = this.begin()
    let header = this.header.getNext()
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
    let curr = pos.current()
    if (!this.empty() && curr != null) {
      let result = curr.getNext()
      // Get Previous node is the most expensive part of this process
      let prev = this.getPrevious(curr).current()
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
    const iterator = this.begin()
    let itemItr = iterator.next();
    while (!itemItr.done) {
      if (itemItr.value.getValue() == item) return iterator;
      itemItr = iterator.next();
    }
    return false;
  }
  // Cost: O(n)
  clear() {
    while (!this.empty()) {
      this.erase(this.begin())
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
    if (node === null)
      return null
    else
      return new LListNode(node.getValue(), this.clone(node.getNext()))
  }

  print() {
    const iterator = this.begin()
    let iterable = false;
    while (!iterable && iterator.current() !== null) {
      console.log(iterator.current().getValue())
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


// Usage
const list = new LList([1, 4, 7, 9, 0, 3]);

const listItr = LListIterator[Symbol.iterator](null, list);


let item1 = listItr.next();
item1
item1 = item1.value.getValue();
item1
let item2 = listItr.next();
item2 = item2.value.getValue();
item2
let item3 = listItr.next();
item3 = item3.value.getValue();
item3
let item4 = listItr.next();
item4 = item4.value.getValue();
item4
let item5 = listItr.next();
item5 = item5.value.getValue();
item5
let item6 = listItr.next();
item6
let item7 = listItr.next();
item7

list.push_back({
  hey: "hola",
  foo: "woo"
});

list.push_back(23);
list.push_back("ehwdwedwe");

let itemItr = listItr.next();
while (!itemItr.done) {
  console.log(itemItr.value.getValue())
  itemItr = listItr.next();
}
listItr.reset()
listItr.next();
listItr.next();
listItr.next();
let weAreOn = listItr.next();
weAreOn;
let erasePos = list.erase(listItr);
list.print();
let insertPos = list.insert(erasePos, {
  uuuuu: 3,
  4: "yehauiodhs"
});
// list.print();

const lastItem = list.end().current();
lastItem;

const findItemItr = list.find(7);
const findItem = findItemItr.current();
findItem;

let isEmpty = list.empty();
isEmpty
list.clear()
isEmpty = list.empty();
isEmpty
list.print();