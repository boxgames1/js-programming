// Declaration

const name = { name: "" };
const number = { number: 0 };
const team = { team: "" };
const tacklingHability = { tacklingHability: 0 };
const passingHability = { passingHability: 0 };
const dribblingHability = { dribblingHability: 0 };
const shootingHability = { shootingHability: 0 };

const canTackle = state => ({
  tackle: playerToTackle => {
    return state.tacklingHability >= playerToTackle.dribblingHability
      ? state.name + " tackled " + playerToTackle.name
      : state.name + " could not tackle " + playerToTackle.name;
  }
});

const canDribble = state => ({
  dribble: playerToDribble => {
    return state.dribblingHability > playerToDribble.tacklingHability
      ? state.name + " dribbled " + playerToDribble.name
      : state.name + " could not dribble " + playerToDribble.name;
  }
});

const Defense = options => {
  return Object.assign(options, canTackle(options));
};

const Midfielder = options => {
  return Object.assign(options, canDribble(options), canTackle(options));
};

const Striker = options => {
  return Object.assign(options, canDribble(options));
};

// Usage

const jeromeBoateng = Defense({
  name: "Jerome Boateng",
  number: 17,
  team: "Bayern Munich",
  tacklingHability: 90
});

jeromeBoateng;

const marcoReus = Midfielder({
  name: "Marco Reus",
  number: 10,
  team: "Borussia Dortmund",
  passingHability: 86,
  dribblingHability: 91,
  tacklingHability: 10
});

marcoReus;

const robertoFirmino = Defense({
  name: "Roberto Firmino",
  number: 9,
  team: "Liverpool",
  shootingHability: 81,
  dribblingHability: 82
});

robertoFirmino;

const try1 = marcoReus.dribble(jeromeBoateng);
try1;
const try2 = marcoReus.tackle(robertoFirmino);
try2;
const try3 = jeromeBoateng.tackle(robertoFirmino);
try3;
