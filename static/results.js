var questions = JSON.parse(document.getElementById("mydiv").dataset.questions);
var answers_checked = {};

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  // drawChart() {
  //   var data = new google.visualization.DataTable();
  //   data.addColumn("string", "Odpowiedź");
  //   data.addColumn("number", "Ilość odpowiedzi");
  //   data.addRows([
  //     ["Tak", 5],
  //     ["Nie", 3],
  //     ["Nie wiem", 2],
  //   ]);

  //   var options = {
  //     title:
  //       {this.props.answers_checked},
  //     //'is3D':true,
  //     legend: "left",
  //     width: 600,
  //     height: 400,
  //   };

  //   // Instantiate and draw the chart.
  //   var chart = new google.visualization.PieChart(
  //     document.getElementById("chart")
  //   );
  //   chart.draw(data, options);
  // }

  render() {
    // google.load("visualization", "1", { packages: ["corechart"] });
    // google.setOnLoadCallback(this.drawChart);

    return (
      <div className="question" id="question">
        <p>{this.props.content}</p>
        <div className="answers">
          {Object.keys(this.props.answers).map((key) => {
            return (
              <label key={key}>
                <div className="answers_div">
                  Odpowiedź: {this.props.answers[key]} <br></br> 5
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
        <a href="/form.html">
          <button className="a_button">Ankieta</button>
        </a>
      </div>
    );
  }
  componentDidMount() {
    // google.load("visualization", "1", { packages: ["corechart"] });
    // google.setOnLoadCallback(drawChart);

    // function drawChart() {
    //   console.log("CHART");
    //   var data = new google.visualization.DataTable();
    //   data.addColumn("string", "Odpowiedź");
    //   data.addColumn("number", "Ilość odpowiedzi");
    //   data.addRows([
    //     ["Tak", 5],
    //     ["Nie", 3],
    //     ["Nie wiem", 2],
    //   ]);

    //   var options = {
    //     title:
    //       "Wyniki pytania 1: Czy poleciłbyś inż biomedyczna młodszemu koledze?",
    //     //'is3D':true,
    //     legend: "left",
    //     width: 600,
    //     height: 400,
    //   };

    //   // Instantiate and draw the chart.
    //   var chart = new google.visualization.PieChart(
    //     document.getElementById("chart")
    //   );
    //   chart.draw(data, options);
    // }

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
