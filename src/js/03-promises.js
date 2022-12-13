import Notiflix from 'notiflix';

const refs = { form: document.querySelector('.form') };

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    }
    reject({ position, delay });
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `:white_tick: Fulfilled promise ${position} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`:x: Rejected promise ${position} in ${delay}ms`);
    });
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  let currentAmount = 0;
  let currentDelay = delay;
  setTimeout(() => {
    createPromise(currentAmount, currentDelay);
    const interval = setInterval(() => {
      currentAmount += 1;
      currentDelay += step;
      if (currentAmount === amount) {
        clearInterval(interval);
      }
      createPromise(currentAmount, currentDelay);
    }, step);
  }, delay);
}
