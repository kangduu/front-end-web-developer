import _ from "lodash";
import "./style/index.css";

function component() {
    var element = document.createElement('div')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('main')

    return element
}

document.body.appendChild(component())