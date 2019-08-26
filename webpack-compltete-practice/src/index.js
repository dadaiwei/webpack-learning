import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import "./css/main.scss";
import image from "./image/image1.png";

const newImage = new Image();
newImage.src = image;
newImage.style.cssText = "width: 100px; height: 100px;";
document.body.append(newImage);

ReactDOM.render(<App />, document.getElementById("root"));
