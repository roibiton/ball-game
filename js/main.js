'use strict'
var gTimeOut
function onBallClick(elBall, maxSize = 500) {
    if (gTimeOut) clearTimeout(gTimeOut)
    var currWidth = elBall.offsetWidth
    var currHeight = elBall.offsetHeight
    var randNum = getRandomInt(20, 61)
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
    }, 500)
    elBall.innerText = elBall.offsetWidth + randNum
}

function onClickChanger() {
    var elBall = document.querySelector('.ball1')
    var limitStr = elBall.getAttribute('onclick').split(',')[1]
    var prevOnClickLimit = parseInt(limitStr.trim())
    onBallClick(elBall, prevOnClickLimit)
    setTimeout(() => {
        elBall = document.querySelector('.ball2')
        var limitStr = elBall.getAttribute('onclick').split(',')[1]
        var prevOnClickLimit = parseInt(limitStr.trim())
        onBallClick(elBall, prevOnClickLimit)
    }, 1000)
}
function onClickMaxSizeChanger() {
    var randReducer = getRandomInt(20, 61)
    var elBall1 = document.querySelector('.ball1')
    var elBall2 = document.querySelector('.ball2')

    var limitStr = elBall1.getAttribute('onclick').split(',')[1]
    var prevOnClickLimit1 = parseInt(limitStr.trim())
    var newMaxSize1 = prevOnClickLimit1 - randReducer
    if (newMaxSize1 < 100) newMaxSize1 = 100
    elBall1.setAttribute('onclick', `onBallClick(this, ${+newMaxSize1})`)
    console.log(`Ball 1 max size changed to: ${newMaxSize1}`)

    var limitStr2 = elBall2.getAttribute('onclick').split(',')[1]
    var prevOnClickLimit2 = parseInt(limitStr2.trim())
    var newMaxSize2 = prevOnClickLimit2 - randReducer
    if (newMaxSize2 < 100) newMaxSize2 = 100
    elBall2.setAttribute('onclick', `onBallClick(this, ${+newMaxSize2})`)
    console.log(`Ball 2 max size changed to: ${newMaxSize2}`)
}