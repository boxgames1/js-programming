const dragons = [ 'cool dragon', 'angry dragon', 'nasty dragon' ]

const iterator = dragons[Symbol.iterator]()

for (const dragon of dragons) {
  dragon
}
const dragon1 = iterator.next();
dragon1
const dragon2 = iterator.next();
dragon2
const dragon3 = iterator.next();
dragon3
const dragon4 = iterator.next();
dragon4

for (const char of dragons[0] ){
    char 
}

const randomNumber = require('random-number')
let randomItem = (array) => {
    const randomIndex = randomNumber({
        min: 0,
        max: array.length - 1,
        integer: true
    })
    return array[randomIndex]
}

let makeDragon = () => {
    const dragonSizes = ["big", "small", "tiny"]
    const dragonAbilities = ["fire", "water", "ice", "time"]
    return randomItem(dragonSizes) + ' ' + randomItem(dragonAbilities) + " dragon"
}

const dragonArmy = {
    [Symbol.iterator]: () => {
        return  {
            next: () => {
                const enoughDragonsSpawned = Math.random() > 0.75
                if(!enoughDragonsSpawned)
                    return {
                        value: makeDragon(),
                        done: false
                    }
                return {
                    done: true
                }
            }
        }
    }
}

for (const dragon of dragonArmy) {
    dragon //?
}
