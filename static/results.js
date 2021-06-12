var questions = JSON.parse(document.getElementById("mydiv").dataset.questions);
var questions_answers = JSON.parse(
  document.getElementById("mydiv1").dataset.answers
);

var answers_checked = {};
let sum = 0;
let i = 0;
let key_count = 1;

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question" id="question">
        <p>{this.props.content}</p>
        <div className="answers">
          {Object.keys(this.props.answers).map((key, index) => {
            console.log("KEY : " + key);
            if (index == 0) sum = 0;
            if (parseInt(key) == key_count) {
              Object.keys(this.props.answers).map((key1, index1) => {
                console.log("i: " + i);
                sum += questions_answers[i].count;
                i++;
                key_count++;
              });
            }

            return (
              <label key={key}>
                <div className="answers_div">
                  Odpowiedź: {this.props.answers[key]} <br></br>
                  {questions_answers.map((count) =>
                    count.question_id == parseInt(key)
                      ? Math.round((count.count / sum) * 1000) / 10 + "%"
                      : null
                  )}
                  {console.log("SUMA" + sum)}
                </div>
              </label>
            );
          })}
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
      <div className="all">
        <div className="section-3-paragraph">Liczba odpowiedzi na pytanie:</div>
        <div className="questions">
          {questions.map((question, index) => (
            <Question
              key={question.question_id}
              content={question.question_text}
              answers={question.possible_answers}
              id={question.question_id}
            />
          ))}
        </div>
        <a href="/form.html">
          <button className="a_button">Ankieta</button>
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
