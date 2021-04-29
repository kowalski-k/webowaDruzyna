import "./ratingScale.css";

var _require = require("babel-types"),
    react = _require.react;

function RatingScale(props) {
  return React.createElement(
    "div",
    { className: "rating_scale" },
    React.createElement(
      "label",
      null,
      React.createElement("input", { type: "radio", name: "rad" }),
      React.createElement(
        "span",
        null,
        "1"
      )
    ),
    React.createElement(
      "label",
      null,
      React.createElement("input", { type: "radio", name: "rad" }),
      React.createElement(
        "span",
        null,
        "2"
      )
    ),
    React.createElement(
      "label",
      null,
      React.createElement("input", { type: "radio", name: "rad" }),
      React.createElement(
        "span",
        null,
        "3"
      )
    ),
    React.createElement(
      "label",
      null,
      React.createElement("input", { type: "radio", name: "rad" }),
      React.createElement(
        "span",
        null,
        "4"
      )
    ),
    React.createElement(
      "label",
      null,
      React.createElement("input", { type: "radio", name: "rad" }),
      React.createElement(
        "span",
        null,
        "5"
      )
    )
  );
}

ReactDOM.render(React.createElement(RatingScale, null), document.querySelector("#rating1"));