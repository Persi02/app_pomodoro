"use strict";
import "./style.css";
const btnStart = document.querySelector(".start");
const btnPause = document.querySelector(".pause");
const btnReset = document.querySelector(".reset");
const timer = document.querySelector(".timer");
let interval = null;
let minutes = 0;
let seconds = 0;

const timerInterval = () => {
  interval = setInterval(() => {
    seconds--;

    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }
    timer.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (minutes === 0 && seconds === 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const startTimer = () => {
  minutes = 25;
  seconds = 0;
  timerInterval();
  btnStart.disabled = true;
};
btnStart.addEventListener("click", startTimer);
btnPause.addEventListener("click", () => {
  clearInterval(interval);
  btnStart.disabled = false;
});
btnReset.addEventListener("click", () => {
  clearInterval(interval);

  btnStart.disabled = false;
  minutes = 0;
  seconds = 0;
  timer.textContent = `${"0" + minutes}:${"0" + seconds}`;
});
