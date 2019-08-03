import $ from "jquery";
import obj from "js/js4.js";
import arr from "js/js5.js";
import str from "js/js6.js";
import "./css/style.css";
import "./css/style.scss";

console.log("index");
console.log("live reload");
console.log(obj);
console.log(arr);
console.log(str);

const image = document.createElement("img");
image.src = require("./img/small.png");

document.body.appendChild(image);

$("body").click(() => {
  console.log("click body");
});
