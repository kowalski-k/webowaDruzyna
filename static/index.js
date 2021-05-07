var questions = JSON.parse(document.getElementById("mydiv").dataset.questions);

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question" id="question">
        <p>{this.props.content}</p>
        <div className="rating_scale">
          <form>
            {Object.keys(this.props.answers).map((key) => {
              return (
                <label key={key}>
                  <input type="radio" name="rad" value={key} />
                  <span>{this.props.answers[key]}</span>
                </label>
              );
            })}
          </form>
        </div>
      </div>
    );
  }
}

class Questions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="questions">
        {questions.map((question) => (
          <Question
            key={question.question_id}
            content={question.question_text}
            answers={question.possible_answers}
          />
        ))}
      </div>
    );
  }
  componentDidMount() {
    var question = document.querySelector(".question");
    var nextBtn = document.querySelector(".next-btn");
    var previousBtn = document.querySelector(".previous-btn");

    var axisX = 0;

    var hideControl = function hideControl() {
      if (axisX === -140 * (questions.length - 1)) {
        nextBtn.classList.add("hideControl");
      } else {
        nextBtn.classList.remove("hideControl");
      }

      if (axisX === 0) {
        previousBtn.classList.add("hideControl");
      } else {
        previousBtn.classList.remove("hideControl");
      }
    };

    hideControl();

    nextBtn.addEventListener("click", function () {
      question.style.marginLeft = (axisX -= 140) + "%";
      hideControl();
    });

    previousBtn.addEventListener("click", function () {
      question.style.marginLeft = (axisX += 140) + "%";
      hideControl();
    });
  }
}

// const styles = {
//   questions: {
//     height: "100%",
//     width: "100%",
//     display: "flex",
//     position: "relative",
//     alignItems: "center",
//   },
//   question: {
//     width: "40%",
//     height: "60rem",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: "#ededee",
//     position: "relative",
//     opacity: "0.85",
//     borderRadius: "3rem",
//     flexShrink: "0",
//     marginTop: "8%",
//     marginBottom: "15%",
//     marginRight: "100%",
//     left: "30%",
//     transition: "margin-left 0.6s cubic-bezier(1, 0, 0, 1)",
//   },

//   paragraph_q: {
//     fontSize: "3rem",
//     margin: "2rem",
//     textAlign: "center",
//   },

//   rating_scale: {
//     display: "block",
//     textAlign: "center",
//     fontSize: "0",
//     position: "absolute",
//     bottom: "5rem",
//     right: "10rem",
//     left: "10rem",
//   },

//   rating_scale_span: {
//     display: "inline-block",
//     boxSizing: "border-box",
//     margin: "0.5rem",
//     fontSize: "20px",
//     fontWeight: "100",
//     width: "4em",
//     background: "#33b1f8",
//     color: "#ededee",
//     borderRadius: "5rem",
//     transition: "transform 0.1s",
//     ":hover": {
//       transform: "scale(1.1)",
//       opacity: "0.5",
//     },
//   },
// };

// rating_scale input[type="radio"]:checked ~ span {
//   background: "#f8c210",
// }
// }

ReactDOM.render(<Questions />, document.querySelector("#questions"));
