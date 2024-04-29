let numOfSeconds = 0;

const timerTextParagraph = document.getElementById('timer-text');

const getTimerText = () => {
    let minutes = Math.floor(numOfSeconds / 60);
    let seconds = numOfSeconds % 60;
    let hours = Math.floor(numOfSeconds / (60 * 60));
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
}

let interval;

const startTimer = () => {
    console.log('starting timer...');
    interval = setInterval(() => {
        numOfSeconds++;
        timerTextParagraph.innerHTML = getTimerText();
    }, 1000);
}

const pauseTimer = () => {
    console.log('pausing timer...');
    clearInterval(interval);
}

const resetTimer = () => {
    console.log('reseting timer...');
    clearInterval(interval);
    numOfSeconds = 0;
    timerTextParagraph.innerHTML = getTimerText();
}