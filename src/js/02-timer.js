// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('.timer-btn[data-start]');
const inputDateRef = document.querySelector('input#datetime-picker');
const timerDayRef = document.querySelector('.value[data-days]');
const timerHourRef = document.querySelector('.value[data-hours]');
const timerMinRef = document.querySelector('.value[data-minutes]');
const timerSecRef = document.querySelector('.value[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

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

let timeId = null;
const INTERVAL = 1000;

/** functions */
function onInputDate(selectedDates) {
  if (selectedDates <= Date.now()) {
    // alert('Please choose a date in the future');
    Notify.failure('Please choose a date in the future');
    startBtnRef.setAttribute('disabled', 'true');
  } else {
    startBtnRef.removeAttribute('disabled', 'true');
    onStartedTimer(selectedDates);
  }
}

function onStartedTimer(selectedDates) {
  startBtnRef.addEventListener('click', () => {
    if (timeId) {
      clearInterval(timeId);
      timeId = null;
      return;
    }
    timeId = setInterval(() => {
      const timerValueInMs = Date.parse(selectedDates) - Date.now();
      const objTimerValue = convertMs(timerValueInMs);
      timerDayRef.textContent = objTimerValue.days ? objTimerValue.days : '00';
      timerHourRef.textContent = objTimerValue.hours;
      timerMinRef.textContent = objTimerValue.minutes;
      timerSecRef.textContent = objTimerValue.seconds;
    }, INTERVAL);
  });
}
