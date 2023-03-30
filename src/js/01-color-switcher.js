function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const DELAY = 1000;
const body = document.body;
let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
  stopBtn.removeAttribute('disabled', 'true');
  startBtn.setAttribute('disabled', 'true');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled', 'true');
});
