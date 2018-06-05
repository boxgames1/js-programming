//Implementation of DoubleLinkedList with its straight and reverse iterators

//Needs the value of the node, previous and next nodes
function DLListNode(value, prev, next) {
  this.value = value;
  this.next = next;
  this.prev = prev;
  this.getNext = () => {
    return this.next;
  };
  this.getPrev = () => {
    return this.prev;
  };
  this.getValue = () => {
    return this.value;
  };
  this.setNext = next => {
    this.next = next;
  };
  this.setPrev = prev => {
    this.prev = prev;
  };
  this.setValue = value => {
    this.value = value;
  };
}

//Needs an array of values
function DLList(values) {
  this.tail = new DLListNode(null, null, null);
  this.header = new DLListNode(null, null, null);
  let current = this.header;
  for (const [index, value] of values.entries()) {
    let newNode = new DLListNode(value, current, null);
    current.setNext(newNode);
    current = newNode;
    if (index == values.length - 1) {
      current.setNext(this.tail);
      this.tail.setPrev(current);
    }
  }

  this.getHeader = () => {
    return this.header;
  };
  this.getTail = () => {
    return this.tail;
  };
}

const DLListIterator = {
  [Symbol.iterator]: dllist => {
    let current = dllist.getHeader();
    return {
      next: () => {
        current = current.getNext();
        if (current === null || current.getValue() === null) {
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

const DLListInverseIterator = {
  [Symbol.iterator]: dllist => {
    let current = dllist.getTail();
    return {
      next: () => {
        current = current.getPrev();
        if (current === null || current.getValue() === null) {
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

// Usage
const list = new DLList([1, 4, 7, 9, 0, 3]);

const listItr = DLListIterator[Symbol.iterator](list);
/*for (const ite of DLListIterator) {
  ite;
}*/

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

const listInvItr = DLListInverseIterator[Symbol.iterator](list);
/*for (const ite of DLListInverseIterator) {
  ite;
}*/

let inVitem1 = listInvItr.next();
inVitem1;
let inVitem2 = listInvItr.next();
inVitem2;
let inVitem3 = listInvItr.next();
inVitem3;
let inVitem4 = listInvItr.next();
inVitem4;
let inVitem5 = listInvItr.next();
inVitem5;
let inVitem6 = listInvItr.next();
inVitem6;
let inVitem7 = listInvItr.next();
inVitem7;
