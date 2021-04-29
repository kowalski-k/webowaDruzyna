import React from "react";

var _require = require("babel-types"),
    react = _require.react;

function Question(props) {
  return React.createElement(
    "div",
    { className: style.question },
    React.createElement("p", { className: style.question_content })
  );
}

ReactDOM.render(React.createElement(Question, null), document.querySelector("#question1"));