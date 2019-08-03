import sayName from "./index2";
import sayAge from "./index3";
import obj from "./index4";

sayAge();
sayName();

export function printMe() {
  console.log("This file is called print.js");
  console.error("I get called from print.js!123");
  console.log(121233);
}

export function printMe1(value) {
  return Array.isArray(value);
}
