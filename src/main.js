"use strict";
import "./style.css";
const btnStart = document.querySelector(".start");
const btnPause = document.querySelector(".pause");
const btnReset = document.querySelector(".reset");
const timer = document.querySelector(".timer");
const statuts = document.querySelector(".status");
let intervalWork = null;
let intervalLongPause = null;
let intervalPause = null;
let minutesWorks = 25;
let minutesPause = 5;
let minutesLongPause = 15;
let seconds = 0;
let nbrWorks = 0;

const timerInterval = () => {
  if (nbrWorks % 7 === 0 && nbrWorks !== 0) {
    statuts.textContent = "Status : Long pause";
    intervalLongPause = setInterval(() => {
      seconds--;

      if (seconds < 0) {
        minutesLongPause--;
        seconds = 59;
      }
      timer.textContent = `${
        minutesLongPause < 10 ? "0" + minutesLongPause : minutesLongPause
      }:${seconds < 10 ? "0" + seconds : seconds}`;
      if (minutesLongPause === 0 && seconds === 0) {
        nbrWorks++;
        minutesLongPause = 15;
        clearInterval(intervalLongPause);
        btnStart.disabled = false;
        statuts.textContent = "Status : fini pour Aujourd'hui";
      }
    }, 1000);
  } else if (nbrWorks % 2 !== 0) {
    statuts.textContent = "Status : Pause";
    intervalPause = setInterval(() => {
      seconds--;

      if (seconds < 0) {
        minutesPause--;
        seconds = 59;
      }
      timer.textContent = `${
        minutesPause < 10 ? "0" + minutesPause : minutesPause
      }:${seconds < 10 ? "0" + seconds : seconds}`;
      if (minutesPause === 0 && seconds === 0) {
        nbrWorks++;
        minutesPause = 5;
        clearInterval(intervalPause);
        timerInterval();
      }
    }, 1000);
  } else {
    statuts.textContent = "Status : Work";
    intervalWork = setInterval(() => {
      seconds--;

      if (seconds < 0) {
        minutesWorks--;
        seconds = 59;
      }
      timer.textContent = `${
        minutesWorks < 10 ? "0" + minutesWorks : minutesWorks
      }:${seconds < 10 ? "0" + seconds : seconds}`;
      if (minutesWorks === 0 && seconds === 0) {
        nbrWorks++;
        minutesWorks = 25;
        clearInterval(intervalWork);
        timerInterval();
      }
    }, 1000);
  }
};

const startTimer = () => {
  timerInterval();
  btnStart.disabled = true;
};
btnStart.addEventListener("click", startTimer);
btnPause.addEventListener("click", () => {
  clearInterval(intervalWork);
  clearInterval(intervalPause);
  clearInterval(intervalLongPause);
  btnStart.disabled = false;
});
btnReset.addEventListener("click", () => {
  clearInterval(intervalWork);
  clearInterval(intervalPause);
  clearInterval(intervalLongPause);
  btnStart.disabled = false;
  minutesWorks = 25;
  minutesPause = 5;
  minutesLongPause = 15;
  seconds = 0;
  nbrWorks = 0;
  statuts.textContent = "Status : Not started";
  timer.textContent = `00:${"0" + seconds}`;
});
