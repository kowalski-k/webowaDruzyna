window.onload = function() {
    Particles.init({
      selector: '.background'
    });
  };

  const question = document.querySelector('.question')
  const nextBtn = document.querySelector('.next-btn')
  const previousBtn = document.querySelector('.previous-btn')

  let axisX = 0

  const hideControl = () => {
    if(axisX === -420) {
        nextBtn.classList.add('hideControl')
    } else {
        nextBtn.classList.remove('hideControl')
    }

    if(axisX === 0) {
        previousBtn.classList.add('hideControl')
    } else {
        previousBtn.classList.remove('hideControl')
    }
}

hideControl()

  nextBtn.addEventListener('click', () => {
    question.style.marginLeft = `${axisX -= 140}%`
    console.log(axisX)
    hideControl()
})

previousBtn.addEventListener('click', () => {
    question.style.marginLeft = `${axisX += 140}%`
    hideControl()
})

