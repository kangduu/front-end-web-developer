import _ from "lodash";
import printMe from "./print";
import "./styles.less"

function component() {
    var element = document.createElement("div");
    var btn = document.createElement("button");

    element.innerHTML = _.join(["Hello", "Webpack5"], ' ');
    element.classList.add('hello')

    btn.innerHTML = "Click";
    btn.onclick = printMe;

    element.appendChild(btn)

    return element;
}

document.body.appendChild(component());