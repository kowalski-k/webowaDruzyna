class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.content}</p>
        <div className="rating_scale">
          <form>
            <label>
              <input type="radio" name="rad" value="1" />
              <span>1</span>
            </label>
            <label>
              <input type="radio" name="rad" value="2" />
              <span>2</span>
            </label>
            <label>
              <input type="radio" name="rad" value="3" />
              <span>3</span>
            </label>
            <label>
              <input type="radio" name="rad" value="4" />
              <span>4</span>
            </label>
            <label>
              <input type="radio" name="rad" value="5" />
              <span>5</span>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Question content="Pytanie 1" />,
  document.querySelector("#question1")
);
ReactDOM.render(
  <Question content="Pytanie 2" />,
  document.querySelector("#question2")
);
ReactDOM.render(
  <Question content="Pytanie 3" />,
  document.querySelector("#question3")
);
