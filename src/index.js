import _ from "lodash";
import "./style.css";
import Icon from "./icon.png";
import Data from "./data.xml";
import printMe from "./print.js";

function component() {
	let element = document.createElement("div");
	let btn = document.createElement("button");

	element.innerHTML = _.join(["Hello", "webpack"], " ");
	element.classList.add("hello");

	let myIcon = new Image();
	myIcon.src = Icon;
	element.appendChild(myIcon);

	console.log(Data);
	btn.innerHTML = "点击这里，然后查看 console!";
	btn.onclick = printMe;
	element.appendChild(btn);

	return element;
}
document.body.appendChild(component());
