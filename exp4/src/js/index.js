import sayName from "./index2";
import sayAge from "./index3";
import { printMe } from "./print";
import style from "../css/main.css";
import image1 from "../img/image1.png";
import _ from "lodash";

sayAge();
sayName();

console.log(style);

function component() {
  const element = document.createElement("div");
  const button = document.createElement("button");

  // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello", style.div1);

  button.innerHTML = "点击";
  button.onclick = printMe;
  element.appendChild(button);

  const newImage = new Image();
  newImage.src = image1;
  newImage.style.cssText = "width: 100px; height: 100px;";
  element.append(newImage);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("print.js updated");
    printMe();
  });
}
