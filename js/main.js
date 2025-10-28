'use strict'

function onBallClick(elBall) {
    var currWidth = elBall.offsetWidth
    var currHeight = elBall.offsetHeight
    elBall.style.width = (currWidth + 50) + 'px'
    elBall.style.height = (currHeight + 50) + 'px'
    elBall.innerText = currWidth + 50
}