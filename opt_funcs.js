let thing;

const opt = {
  string: (thing) => {return thing.length},
  number: (thing) => {return thing + 1},
  undefined: () => {return null},
  null: () => {return null},
  object: (thing) => {return JSON.stringify(thing)}

}

// thing = "9"; // 1
// thing = [1,2,3,'e']; // 10
console.log(typeof thing);

opt[typeof thing](thing);