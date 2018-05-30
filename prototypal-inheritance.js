// Declaration

class GuitarAmp {
  constructor({ cabinet = "spruce", distortion = "1", volume = "0" } = {}) {
    Object.assign(this, {
      cabinet,
      distortion,
      volume
    });
  }
}

class BassAmp extends GuitarAmp {
  constructor(options = {}) {
    super(options);
    this.lowCut = options.lowCut;
  }
}

class ChannelStrip extends BassAmp {
  constructor(options = {}) {
    super(options);
    this.inputLevel = options.inputLevel;
  }
}

// Usage

const myAmp = new BassAmp(); // Instantiate BassAmp
myAmp;
const actualAmp = Object.keys(myAmp); //Get Keys from myAmp
const expectedAmpKeys = ["cabinet", "distortion", "volume", "lowCut"];
actualAmp;

const myStrip = new ChannelStrip(); // Instantiate myStrip
myStrip;
const actualStrip = Object.keys(myStrip); // Get keys from myStrip
const expectedStripKeys = [
  "cabinet",
  "distortion",
  "volume",
  "lowCut",
  "inputLevel"
];
actualStrip;

/* 
  This is an example of how OO design goes wrong. 
  A channel strip isn’t actually a type of guitar amp, and doesn’t actually need a cabinet at all. 
  A better option would be to create a new base class 
  that both the amps and the channel strip inherits from, but even that has limitations.
*/

/* 
  The really big problem with inheritance is 
  that you’re encouraged to predict the future. 
  Inheritance encourages you to build this taxonomy of objects very early on in your project, 
  and you are most likely going to make design mistakes doing that, 
  because humans cannot predict the future (even though it feels like we can), 
  and getting out of these inheritiance taxonomies is a lot harder than getting out of them.
*/
