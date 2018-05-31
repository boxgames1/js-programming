// Declaration

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getStats = state => ({
  stats: () => {
    return JSON.stringify(state.statsObj);
  }
});

const canTackle = state => ({
  tackle: playerToTackle => {
    if (state.tacklingHability >= playerToTackle.dribblingHability) {
      state.statsObj.tackles_made++;
      playerToTackle.statsObj.dribbles_missed++;
      return true;
    } else {
      state.statsObj.tackles_missed++;
      playerToTackle.statsObj.dribbles_made++;
      return false;
    }
  }
});

const canDribble = state => ({
  dribble: playerToDribble => {
    return !playerToDribble.tackle(state);
  }
});

const canPass = state => ({
  pass: playerToPass => {
    if (state.passingHability + playerToPass.quality >= getRandomInt(0, 200)) {
      state.statsObj.passes_made++;
      return true;
    } else {
      state.statsObj.passes_missed++;
      return false;
    }
  }
});

const canStop = state => ({
  stop: playerToStop => {
    if (state.stoppingHability >= playerToStop.shootingHability) {
      state.statsObj.saves_made++;
      playerToStop.statsObj.goals_missed++;
      return true;
    } else {
      state.statsObj.goals_allowed++;
      playerToStop.statsObj.goals_made++;
      return false;
    }
  }
});

const canShoot = state => ({
  shoot: playerToShoot => {
    return !playerToShoot.stop(state);
  }
});

const Goalkeeper = state => {
  state.statsObj = {};
  state.statsObj.saves_made = 0;
  state.statsObj.goals_allowed = 0;
  return Object.assign(state, getStats(state), canStop(state));
};

const Defense = state => {
  state.statsObj = {};
  state.statsObj.tackles_made = 0;
  state.statsObj.tackles_missed = 0;
  return Object.assign(state, getStats(state), canTackle(state));
};

const Midfielder = state => {
  state.statsObj = {};
  state.statsObj.tackles_made = 0;
  state.statsObj.tackles_missed = 0;
  state.statsObj.dribbles_made = 0;
  state.statsObj.dribbles_missed = 0;
  state.statsObj.passes_made = 0;
  state.statsObj.passes_missed = 0;
  return Object.assign(
    state,
    getStats(state),
    canDribble(state),
    canTackle(state),
    canPass(state)
  );
};

const Striker = state => {
  state.statsObj = {};
  state.statsObj.dribbles_made = 0;
  state.statsObj.dribbles_missed = 0;
  state.statsObj.goals_made = 0;
  state.statsObj.goals_missed = 0;
  return Object.assign(
    state,
    getStats(state),
    canDribble(state),
    canShoot(state)
  );
};

// Instantiation

const manuelNeuer = Goalkeeper({
  name: "Manuel Neuer",
  number: 1,
  team: "Bayern Munich",
  stoppingHability: 98,
  quality: 72
});

const jeromeBoateng = Defense({
  name: "Jerome Boateng",
  number: 17,
  team: "Bayern Munich",
  tacklingHability: 90,
  quality: 67
});

const marcoReus = Midfielder({
  name: "Marco Reus",
  number: 10,
  team: "Borussia Dortmund",
  passingHability: 86,
  dribblingHability: 91,
  tacklingHability: 10,
  quality: 91
});

const robertoFirmino = Striker({
  name: "Roberto Firmino",
  number: 9,
  team: "Liverpool",
  shootingHability: 81,
  dribblingHability: 82,
  quality: 84
});

// Running

marcoReus.dribble(jeromeBoateng);
marcoReus.tackle(robertoFirmino);
jeromeBoateng.tackle(robertoFirmino);
robertoFirmino.shoot(manuelNeuer);
marcoReus.pass(jeromeBoateng);
marcoReus.pass(robertoFirmino);
marcoReus.pass(jeromeBoateng);
marcoReus.pass(robertoFirmino);
marcoReus.pass(manuelNeuer);
marcoReus.pass(jeromeBoateng);
robertoFirmino.shoot(manuelNeuer);
const statsmr = marcoReus.stats();
statsmr;
const statsrf = robertoFirmino.stats();
statsrf;
