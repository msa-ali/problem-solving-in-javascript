const progress_bar  = document.querySelector('.progress-bar-content');

const progrss_bar_span = document.querySelector('.progress-bar span');

let currentWidth = -25;

const interval = setInterval(() => {
    currentWidth = currentWidth + 25;
    if(currentWidth <= 100) {
        progress_bar.style.width = (currentWidth) + "%";
        progrss_bar_span.innerHTML = (currentWidth) + "%";
    }
}, 1000);

setTimeout(() => {
    clearInterval(interval);
}, 6000);