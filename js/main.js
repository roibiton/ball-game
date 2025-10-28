'use strict'
var gTimeOut
var gInterval
var gCycleCount = 0
var gState = [{
        maxSize1: 500,
        backgroundColor1: 'red',
        width1: 100,
        height1: 100,
        maxSize2: 300,
        backgroundColor2: 'blue',
        width2: 100,
        height2: 100,
        bodyBackgroundColor: 'black'
    },
]
var gStateIdx = 0

function onBallClick(elBall, maxSize = 500) {
    var currWidth = elBall.offsetWidth
    var currHeight = elBall.offsetHeight
    var randNum = getRandomInt(20, 61)
    var randColor = getRandomColor()
    elBall.style.width = (currWidth + randNum) + 'px'
    elBall.style.height = (currHeight + randNum) + 'px'
    elBall.style.backgroundColor = randColor
    setTimeout(() => {
        if (elBall.offsetWidth >= maxSize || elBall.offsetHeight >= maxSize) {
            elBall.style.width = 100 + 'px'
            elBall.style.height = 100 + 'px'
            elBall.innerText = 100
        }
        captureAndSaveState()
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
        captureAndSaveState()
    }, 1000)
}
function onReduceBallsLimit() {
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
    captureAndSaveState()
}

function onBackgroundChange() {
    var randColor = getRandomColor()
    document.body.style.backgroundColor = randColor
    captureAndSaveState()
    // document.querySelector('body').style.backgroundColor = randColor
}

function onResetGame() {
    var elBalls = document.querySelectorAll('.ball')
    elBalls.forEach(elBall => {
        elBall.style.width = 100 + 'px'
        elBall.style.height = 100 + 'px'
        elBall.innerText = 100
    })
    var elBody = document.querySelector('body')
    elBody.style.backgroundColor = 'black'
    var elBall1 = document.querySelector('.ball1')
    elBall1.setAttribute('onclick', `onBallClick(this, 500)`)
    var elBall2 = document.querySelector('.ball2')
    elBall2.setAttribute('onclick', `onBallClick(this, 300)`)
    captureAndSaveState()
}

function onBall6MouseOver() {
    if (gTimeOut) clearTimeout(gTimeOut)
    gTimeOut = setTimeout(() => {
        gCycleCount = 0
        gInterval = setInterval(autoClickBalls, 2000)
        console.log('Interval started.')
    }, 2000)
}

function onBall6MouseOut() {
    if (gTimeOut) clearTimeout(gTimeOut)
    if (gInterval) clearInterval(gInterval)
    gCycleCount = 0
}

function autoClickBalls() {
    if (gCycleCount >= 10) {
        clearInterval(gInterval)
        return
    }
    gCycleCount++
    var elBall1 = document.querySelector('.ball1')
    var elBall2 = document.querySelector('.ball2')
    var elBall3 = document.querySelector('.ball3')
    var elBall4 = document.querySelector('.ball4')
    var elBall5 = document.querySelector('.ball5')
    elBall1.click()
    elBall2.click()
    elBall3.click()
    elBall4.click()
    elBall5.click()
}

function captureAndSaveState() {
    if (gStateIdx < gState.length - 1) {
        gState = gState.slice(0, gStateIdx + 1)
    }
    var elBall1 = document.querySelector('.ball1')
    var elBall2 = document.querySelector('.ball2')
    var elBody = document.querySelector('body')

    var newState = {
        maxSize1: parseInt(elBall1.getAttribute('onclick').split(',')[1].trim()),
        maxSize2: parseInt(elBall2.getAttribute('onclick').split(',')[1].trim()),
        backgroundColor1: elBall1.style.backgroundColor,
        width1: elBall1.offsetWidth,
        height1: elBall1.offsetHeight,
        backgroundColor2: elBall2.style.backgroundColor,
        width2: elBall2.offsetWidth,
        height2: elBall2.offsetHeight,
        bodyBackgroundColor: elBody.style.backgroundColor
    }

    gState.push(newState)
    gStateIdx = gState.length - 1
}

function applyState(state) {
    var elBall1 = document.querySelector('.ball1')
    var elBall2 = document.querySelector('.ball2')
    var elBody = document.querySelector('body')
    
    elBall1.style.width = state.width1 + 'px'
    elBall1.style.height = state.height1 + 'px'
    elBall1.style.backgroundColor = state.backgroundColor1
    elBall1.innerText = state.width1
    elBall1.setAttribute('onclick', `onBallClick(this, ${state.maxSize1})`)

    elBall2.style.width = state.width2 + 'px'
    elBall2.style.height = state.height2 + 'px'
    elBall2.style.backgroundColor = state.backgroundColor2
    elBall2.innerText = state.width2
    elBall2.setAttribute('onclick', `onBallClick(this, ${state.maxSize2})`)

    elBody.style.backgroundColor = state.bodyBackgroundColor
}

function onUndo() {
    if (gStateIdx > 0) {
        gStateIdx--
        applyState(gState[gStateIdx])
        console.log(`Undo successful. Current Index: ${gStateIdx}`)
    } else {
        console.log('Cannot Undo further.')
    }
}

function onRedo() {
    if (gStateIdx < gState.length - 1) {
        gStateIdx++
        applyState(gState[gStateIdx])
        console.log(`Redo successful. Current Index: ${gStateIdx}`)
    } else {
        console.log('Cannot Redo further.')
    }
}