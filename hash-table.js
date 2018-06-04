// Implementation of HashTable
// The class counts with a constructor and several methods

function HashTable(obj) {
  this.length = 0;
  this.items = {};
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      this.items[p] = obj[p];
      this.length++;
    }
  }

  this.setItem = (key, value) => {
    var previous = undefined;
    if (this.hasItem(key)) {
      previous = this.items[key];
    } else {
      this.length++;
    }
    this.items[key] = value;
    return previous;
  };

  this.getItem = key => {
    return this.hasItem(key) ? this.items[key] : undefined;
  };

  this.hasItem = key => {
    return this.items.hasOwnProperty(key);
  };

  this.removeItem = key => {
    if (this.hasItem(key)) {
      previous = this.items[key];
      this.length--;
      delete this.items[key];
      return previous;
    } else {
      return undefined;
    }
  };

  this.keys = () => {
    var keys = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        keys.push(k);
      }
    }
    return keys;
  };

  this.values = () => {
    var values = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        values.push(this.items[k]);
      }
    }
    return values;
  };

  this.each = fn => {
    for (var k in this.items) {
      if (this.hasItem(k)) {
        fn(k, this.items[k]);
      }
    }
  };

  this.clear = () => {
    this.items = {};
    this.length = 0;
  };
}

// Usage
const ht = new HashTable({ one: 1, two: 2, three: 3, "i'm no 4": 4 });

let hasKeyFour = ht.hasItem("four");
hasKeyFour;

let previous = ht.setItem("four", 44);
previous;

hasKeyFour = ht.hasItem("four");
hasKeyFour;

previous = ht.removeItem("four", 44);
previous;

previous = ht.setItem("list", {
  "1.1": 1.1,
  "2.2": 2.2,
  "3.3": 3.3,
  "3.3": 3.3
});

ht.each((item, val) => console.log(item, " =>", val));

ht.clear()
