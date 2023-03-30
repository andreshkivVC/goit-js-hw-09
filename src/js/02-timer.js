import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  buttonStartEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onInputDate(selectedDates[0]);
  },
};

const fp = flatpickr('#datetime-picker', options);

refs.buttonStartEl.setAttribute('disabled', 'disabled');

let timeId = null;
const INTERVAL = 1000;

/** functions */

function onInputDate(selectedDates) {
  if (selectedDates <= Date.now()) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.buttonStartEl.removeAttribute('disabled', 'disabled');
    onStartedTimer(selectedDates);
  }
}

function onStartedTimer(selectedDates) {
  let timerValueInMs = Date.parse(selectedDates) - Date.now();
  let objTimerValue = convertMs(timerValueInMs);

  refs.buttonStartEl.addEventListener('click', () => {
    refs.buttonStartEl.setAttribute('disabled', 'disabled');
    refs.inputDateEl.setAttribute('disabled', 'disabled');
    timeId = setInterval(() => {
      if (timerValueInMs <= 0) {
        clearInterval(timeId);
        return;
      }

      objTimerValue = convertMs(timerValueInMs);
      refs.daysEl.textContent = addLeadingZero(objTimerValue.days);
      refs.hoursEl.textContent = addLeadingZero(objTimerValue.hours);
      refs.minutesEl.textContent = addLeadingZero(objTimerValue.minutes);
      refs.secondsEl.textContent = addLeadingZero(objTimerValue.seconds);
      timerValueInMs -= INTERVAL;
    }, INTERVAL);
  });
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
