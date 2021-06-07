var questions = JSON.parse(document.getElementById("mydiv").dataset.questions);
var answers_checked = {};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    answers_checked[event.target.id] = event.target.value;
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
                  <input
                    type="radio"
                    name="rad"
                    value={key}
                    id={this.props.id}
                    onChange={this.onValueChange}
                  />
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
    this.formSubmit = this.formSubmit.bind(this);
    this.addAnswerHandler = this.addAnswerHandler.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();

    console.log(answers_checked);
  }

  addAnswerHandler() {
    fetch(
      "https://webowadruzynatest-default-rtdb.firebaseio.com/answers.json",
      {
        method: "POST",
        body: JSON.stringify(answers_checked),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div className="all">
        <div className="questions">
          {questions.map((question) => (
            <Question
              key={question.question_id}
              content={question.question_text}
              answers={question.possible_answers}
              id={question.question_id}
            />
          ))}
        </div>
        <input
          type="submit"
          className="submit_button"
          onClick={this.addAnswerHandler}
        ></input>
        <a href="/results.html">
          <button className="a_button">Zobacz Odpowiedzi</button>
        </a>
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

ReactDOM.render(<Questions />, document.querySelector("#questions"));
