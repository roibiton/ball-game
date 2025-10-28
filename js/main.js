'use strict'
var gTimeOut
function onBallClick(elBall) {
    if (gTimeOut) clearTimeout(gTimeOut)
    var currWidth = elBall.offsetWidth
    var currHeight = elBall.offsetHeight
    elBall.style.width = (currWidth + 50) + 'px'
    elBall.style.height = (currHeight + 50) + 'px'
    gTimeOut = setTimeout(() => {
        if (elBall.offsetWidth >= 400 || elBall.offsetHeight >= 400) {
            elBall.style.width = 100 + 'px'
            elBall.style.height = 100 + 'px'
            elBall.innerText=100
        }
    }, 1000)
    elBall.innerText = elBall.offsetWidth + 50

}