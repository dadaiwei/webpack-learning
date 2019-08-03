import obj1 from "js/js4.js";
import arr from "js/js5.js";
import str from "js/js6.js";

console.log("index1");
console.log(obj1);
console.log(arr);
console.log(str);

const a = () => {
  console.log("function");
};

const obj = {
  name: "dada",
  sayName() {
    console.log(this.name);
  }
};
