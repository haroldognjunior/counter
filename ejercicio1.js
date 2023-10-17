let counter = 0;
let interval;
let pressStartTime;
let incrementTimes;
let stop;

const button = document.getElementById("myButton");

function incrementCounter() {
  stop = false;
  do {
    counter = counter + incrementTimes;
    if (counter > 15) {
      counter = 1;
    }
    logEvent("Button incremented by " + incrementTimes);
    updateCounter();
  } while (stop);
}

function updateCounter() {
  button.textContent = `Counter: ${counter}`;
}

function resetCounter() {
  counter = 1;
  stop = true;
  updateCounter();
}

function logEvent(event) {
  console.log(event);
}

button.addEventListener("click", () => {
  const elapsedTime = Date.now() - pressStartTime;
  if (pressStartTime && elapsedTime >= 5000) {
    resetCounter();
    logEvent("Button pressed for 5 seconds or more");
    clearInterval(interval);
  } else if (pressStartTime && elapsedTime >= 2000 && elapsedTime < 5000) {
    clearInterval(interval);
    logEvent("Button pressed for 2 seconds");
    ButtonState(3);
    updateCounter();
    interval = setInterval(incrementCounter, 2000);
  } else {
    clearInterval(interval);
    logEvent("Button pressed for 1 second");
    ButtonState(1);
    interval = setInterval(incrementCounter, 2000);
  }
  pressStartTime = undefined;
});

button.addEventListener("mousedown", () => {
  pressStartTime = Date.now();
});

function ButtonState(times) {
  incrementTimes = times;
}
