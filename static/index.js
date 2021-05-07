var questions = JSON.parse(document.getElementById("mydiv").dataset.questions);

class RatingScale extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rating_scale">
        <form>
          {Object.keys(this.props.answers).map((key) => {
            return (
              <label>
                <input type="radio" name="rad" value={key} key={key} />
                <span>{this.props.answers[key]}</span>
              </label>
            );
          })}
        </form>
      </div>
    );
  }
}

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

ReactDOM.render(<Questions />, document.querySelector("#questions"));
