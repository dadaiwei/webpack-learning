import "../css/main.css";

console.log("app");

const button = document.querySelector("#button");

button.onclick = (e) =>
  import(/* webpackChunkName: "print" */ "./print").then((module) => {
    console.log(module);
    var print = module.default;
    print();
  });
