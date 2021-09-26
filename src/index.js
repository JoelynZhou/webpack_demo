// import _ from "lodash";
// import Icon from "./icon.png";
// import Data from "./data.xml";
// import printMe from "./print.js";
// import { cube } from "./math.js";
// import "./style.css";

// function component() {
// 	let element = document.createElement("div");
// 	let btn = document.createElement("button");
// 	let preDOM = document.createElement("pre");

// 	element.innerHTML = _.join(["Hello", "webpack"], " ");
// 	element.classList.add("hello");

// 	let myIcon = new Image();
// 	myIcon.src = Icon;
// 	myIcon.setAttribute("width", 200);
// 	element.appendChild(myIcon);

// 	console.log(Data);
// 	btn.innerHTML = "点击这里，然后查看 console!";
// 	btn.onclick = printMe;
// 	element.appendChild(btn);

// 	preDOM.innerHTML = ["Hi,webpack!", "5 cubed is equal to" + cube(5)].join(
// 		"\n\n"
// 	);
// 	element.appendChild(preDOM);

// 	return element;
// }
// document.body.appendChild(component());

// if (module.hot) {
// 	module.hot.accept("./print.js", function () {
// 		console.log("Acception the updated printMe module!");
// 		printMe();
// 	});
// }

function getComponent() {
	/**
	 * 通过动态导入 lodash 来分离出一个 chunk
	 */
	return import(/* webpackChunkName: "lodash" */ "lodash")
		.then(({ default: _ }) => {
			let element = document.createElement("div");
			element.innerHTML = _.join(["Hello", "webpack"], "");
			return element;
		})
		.catch((err) => "An error occurred while loading the component");
}

getComponent().then((component) => {
	document.body.appendChild(component);
});
