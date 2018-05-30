// Declaration

const distortion = { distortion: 1 };
const volume = { volume: 1 };
const cabinet = { cabinet: "maple" };
const lowCut = { lowCut: 1 };
const inputLevel = { inputLevel: 1 };

const GuitarAmp = options => {
  return Object.assign({}, distortion, volume, cabinet, options);
};

const BassAmp = options => {
  return Object.assign({}, lowCut, volume, cabinet, options);
};

const ChannelStrip = options => {
  return Object.assign({}, inputLevel, lowCut, volume, options);
};

// Usage

const levelGuitarAmp = 2;
const cabinetGuitarAmp = "vintage";

const actualGuitarAmp = GuitarAmp({
  distortion: levelGuitarAmp,
  volume: levelGuitarAmp,
  cabinetGuitarAmp
});
actualGuitarAmp;

const levelBassAmp = 2;
const cabinetBassAmp = "vintage";

const actualBassAmp = BassAmp({
  lowCut: levelBassAmp,
  volume: levelBassAmp,
  cabinetBassAmp
});

actualBassAmp;

const levelChannel = 2;

const actualChannel = ChannelStrip({
  inputLevel: levelChannel,
  lowCut: levelChannel,
  volume: levelChannel
});
actualChannel;

/* 
  Concatenative inheritance: The process of inheriting features directly from one object to another 
  by copying the source objects properties. In JavaScript, 
  source prototypes are commonly referred to as mixins. Since ES6, 
  this feature has a convenience utility in JavaScript called `Object.assign()`

  Prototype delegation: In JavaScript, an object may have a link to a prototype for delegation. 
  If a property is not found on the object, the lookup is delegated to the delegate prototype, 
  which may have a link to its own delegate prototype, 
  and so on up the chain until you arrive at `Object.prototype`, 
  which is the root delegate. 
  This is the prototype that gets hooked up when you attach to a `Constructor.prototype` 
  and instantiate with `new`. You can also use `Object.create()` for this purpose, 
  and even mix this technique with concatenation in order to flatten multiple prototypes to a single delegate, 
  or extend the object instance after creation.

  Functional inheritance: In JavaScript, any function can create an object. 
  When that function is not a constructor (or `class`), 
  it’s called a factory function. 
  Functional inheritance works by producing an object from a factory, 
  and extending the produced object by assigning properties to it directly (using concatenative inheritance). 
*/

// NOTE: If you are not used to deal with guitar amps, please refer to composition2 file
