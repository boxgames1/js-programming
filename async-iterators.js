function createStore() {
  const tables = {
    customer: {
      1: { name: "John" },
      2: { name: "Mattias" },
      3: { name: "Kim" }
    },
    food: {
      1: ["cake", "waffle"],
      2: ["coffee"],
      3: ["apple", "carrot"]
    }
  };

  return {
    get: (table, id) => tables[table][id]
  };
}

const store = createStore();

const customersItr = {
  [Symbol.iterator]: () => {
    let index = 0;
    return {
      next: () => {
        index++;
        const customer = store.get("customer", index);
        if (!customer) {
          return {
            done: true
          };
        }
        customer.foods = store.get("food", index);
        return {
          value: customer,
          done: false
        };
      }
    };
  }
};

for (const cust of customersItr) {
  cust;
}

function createAsyncStore() {
  const tables = {
    customer: {
      1: { name: "John" },
      2: { name: "Mattias" },
      3: { name: "Kim" }
    },
    food: {
      1: ["cake", "waffle"],
      2: ["coffee"],
      3: ["apple", "carrot"]
    }
  };

  return {
    get: (table, id) => delay(50).then(() => tables[table][id])
  };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncStore = createAsyncStore();

const asyncCustomersItr = {
  [Symbol.iterator]: function() {
    let i = 0;
    return {
      next: async function() {
        i++;
        const customer = await asyncStore.get("customer", i);

        if (!customer) {
          return { done: true };
        }

        customer.foods = await asyncStore.get("food", i);
        return {
          value: customer,
          done: false
        };
      }
    };
  }
};

(async function() {
  const iterator = asyncCustomersItr[Symbol.iterator]();
  const customer1 = (await iterator.next()).value;
  customer1;
  const customer2 = (await iterator.next()).value;
  customer2;
  const customer3 = (await iterator.next()).value;
  customer3;

  for await (const customer of asyncCustomersItr) {
    customer; //?
  }
})();
