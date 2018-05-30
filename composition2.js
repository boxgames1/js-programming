// Declaration

const name = { name: "" };
const number = { number: 0 };
const team = { team: "" };
const tacklingHability = { tacklingHability: 0 };
const passingHability = { passingHability: 0 };
const shootingHability = { shootingHability: 0 };

const Defense = options => {
  return Object.assign({}, name, number, team, tacklingHability, options);
};

const Midfielder = options => {
  return Object.assign({}, name, number, team, passingHability, options);
};

const Striker = options => {
  return Object.assign({}, name, number, team, shootingHability, options);
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
  passingHability: 86
});

marcoReus;

const robertoFirmino = Defense({
  name: "Roberto Firmino",
  number: 9,
  team: "Liverpool",
  tacklingHability: 81
});

robertoFirmino;
