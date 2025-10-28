'use strict'
var gTimeOut
function onBallClick(elBall) {
    if (gTimeOut) clearTimeout(gTimeOut)
    var currWidth = elBall.offsetWidth
    var currHeight = elBall.offsetHeight
    var randNum=getRandomInt(20,60)
    var randColor=getRandomColor()
    elBall.style.width = (currWidth + randNum) + 'px'
    elBall.style.height = (currHeight + randNum) + 'px'
    elBall.style.backgroundColor=randColor
    gTimeOut = setTimeout(() => {
        if (elBall.offsetWidth >= 400 || elBall.offsetHeight >= 400) {
            elBall.style.width = 100 + 'px'
            elBall.style.height = 100 + 'px'
            elBall.innerText=100
        }
    }, 1000)
    elBall.innerText = elBall.offsetWidth + randNum
}