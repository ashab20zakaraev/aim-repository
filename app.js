const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeElement = document.getElementById('time')
const timeList = document.getElementById('time-list')
const board = document.getElementById('board')
const colors = ['#FFFF33', '#FF0000', '#9999CC', '#FF33FF', '#00FFCC', '#99FF33', '#6699FF', '#33FF33']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()

    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')

        startGame()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function finishGame() {
    board.innerHTML = `
        <h1>Счет: <span class="primary">${score}</span></h1> <br>
        <a href="#" class="btn-restart" onClick="window.location.reload();">restart</a>
    `
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.background = `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 47%, ${getRandomColor()} 100%)`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}


function setTime(value) {
    timeElement.innerHTML = `00:${value}`
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')

        if (circle) {
            circle.click()
        }
    }

    setInterval(kill, 04)

}