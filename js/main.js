'use strict'
var gTimeOut
function onBallClick(elBall, maxSize = 500) {
    if (gTimeOut) clearTimeout(gTimeOut)
    var currWidth = elBall.offsetWidth
    var currHeight = elBall.offsetHeight
    var randNum = getRandomInt(20, 60)
    var randColor = getRandomColor()
    elBall.style.width = (currWidth + randNum) + 'px'
    elBall.style.height = (currHeight + randNum) + 'px'
    elBall.style.backgroundColor = randColor
    gTimeOut = setTimeout(() => {
        if (elBall.offsetWidth >= maxSize || elBall.offsetHeight >= maxSize) {
            elBall.style.width = 100 + 'px'
            elBall.style.height = 100 + 'px'
            elBall.innerText = 100
        }
    }, 1000)
    elBall.innerText = elBall.offsetWidth + randNum
}

function onBallClickChanger() {
    var elBall = document.querySelector('.ball1')
    onBallClick(elBall, 500)
    setTimeout(() => {
        elBall = document.querySelector('.ball2')
        onBallClick(elBall, 300)
    }, 1000)
}