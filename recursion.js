//using quokka.js

const assignFoodsToCustomers = ([ head, ...tail ]) => {
    return !head 
      ? false
      : head.foods = foods[head.foodType] && assignFoodsToCustomers(tail)    
}

const customers = [
    { name: 'John', foodType: 3 },
    { name: 'Mattias', foodType: 2 },
    { name: 'Kim', foodType: 1 },
];
    
const foods = {
    1: [ 'cake', 'waffle' ],
    2: [ 'coffee' ],
    3: [ 'apple', 'carrot' ],
};

assignFoodsToCustomers(customers);

customers
