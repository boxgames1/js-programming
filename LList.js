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
  getHeader() {
    return this.header;
  }
}

const LListIterator = {
  [Symbol.iterator]: () => {
    let current = list.getHeader();
    return {
      next: () => {
        current = current.getNext();
        if (current === null) {
          return {
            done: true
          };
        }
        return {
          value: current.getValue(),
          done: false
        };
      }
    };
  }
};

const list = new LList([1, 4, 7, 9, 0, 3]);

const listItr = LListIterator[Symbol.iterator]();

for (const ite of LListIterator) {
  ite;
}

let item1 = listItr.next();
item1;
let item2 = listItr.next();
item2;
let item3 = listItr.next();
item3;
let item4 = listItr.next();
item4;
let item5 = listItr.next();
item5;
let item6 = listItr.next();
item6;
let item7 = listItr.next();
item7;
