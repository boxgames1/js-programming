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
  push_back(item){
    const last = this.getLastItem();
    const newItem = new LListNode(item, null);
    last.setNext(newItem);
  }
  getLastItem() {
    const iterator = LListIterator[Symbol.iterator](this);
    let item = iterator.next()
    while(item.value && item.value.getNext() != null){
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
      }
    };
  }
};

const list = new LList([1, 4, 7, 9, 0, 3]);

const listItr = LListIterator[Symbol.iterator](list);
/*
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
item7*/

list.push_back({
  hey: "hola",
  foo: "woo"
});

list.push_back(23);
list.push_back("ehwdwedwe");

let itemItr = listItr.next();
while(!itemItr.done){
  console.log(itemItr.value.getValue())
  itemItr = listItr.next();
}

const lastItem = list.getLastItem()
lastItem