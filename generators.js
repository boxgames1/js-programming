let makeDragon = () => {
    const dragonSizes = ["big", "small", "tiny"]
    const dragonAbilities = ["fire", "water", "ice", "time"]
    return randomItem(dragonSizes) + ' ' + randomItem(dragonAbilities) + " dragon"
}

;(() => {

  
  
    function someDragons() {
      let iteration = -1
      const iterator = {
        next: () => {
          iteration++
          if (iteration === 0)
            return {value: 'fluffykins the lighting dragon', done: false }
          if (iteration === 1)
            return {value: 'waffle the time dragon', done: false }
          if (iteration === 2) {
            if (Math.random() < 0.50) {
              return { value: 'hardy the dog', done: true }
            }
          }
          return { value: undefined, done: true }
        }
      }
      return iterator
    }
  
    const iterator = someDragons()
    const itr1 = iterator.next() 
    itr1
    const itr2 = iterator.next() 
    itr2
    const itr3 = iterator.next() 
    itr3
    const itr4 = iterator.next() 
    itr4
  
  })()
