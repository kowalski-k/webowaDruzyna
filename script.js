window.onload = function () {
  Particles.init({
    selector: ".background",
  });
};

var question = document.querySelector(".question");
var nextBtn = document.querySelector(".next-btn");
var previousBtn = document.querySelector(".previous-btn");

var axisX = 0;

var hideControl = function hideControl() {
  if (axisX === -280) {
    nextBtn.classList.add("hideControl");
    console.log(axisX);
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
  console.log(axisX);
  hideControl();
});

previousBtn.addEventListener("click", function () {
  question.style.marginLeft = (axisX += 140) + "%";
  hideControl();
});
