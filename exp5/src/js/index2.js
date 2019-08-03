import obj from "./index4";

console.log(obj);

export default function sayName() {
  console.log("sayName");
}

$(document).click(() => {
  console.log("jquery Click");
});
