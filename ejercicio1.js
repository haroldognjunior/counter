let counter = 0; // Initialize the counter to 0
let interval;
let pressStartTime;
let incrementTimes;
let stop;
let pressedButton;

const button = document.getElementById("myButton");

function incrementCounter() {
  stop = false;
  do {
    counter = counter + incrementTimes;
    if (counter > 15) {
      counter = 1; // Reset the counter when it reaches 15
    }
    logEvent("Button incremented by " + incrementTimes);
    updateCounter();
  } while (stop);
}

function updateCounter() {
  button.textContent = `Counter: ${counter}`; // Update the button text with the current counter value
}

function resetCounter() {
  counter = 1; // Reset the counter to 1
  stop = true;
  updateCounter();
}

function logEvent(event) {
  console.log(event); // Log events to the console, saving this event if we would have database
}

button.addEventListener("click", () => {
  const elapsedTime = Date.now() - pressStartTime;
  if (pressStartTime && elapsedTime >= 5000) {
    resetCounter();
    logEvent("Button pressed for 5 seconds or more");
    clearInterval(interval); // Clear the interval timer
  } else if (pressStartTime && elapsedTime >= 2000 && elapsedTime < 5000) {
    clearInterval(interval);
    logEvent("Button pressed for 2 seconds");
    setIncrement(3); // Set the increment to 3
    updateCounter();
    interval = setInterval(incrementCounter, 2000); // Start the interval with a 2-second delay
  } else {
    clearInterval(interval);
    logEvent("Button pressed for 1 second");
    setIncrement(1, 0); // Set the increment to 1
    interval = setInterval(incrementCounter, 2000); // Start the interval with a 2-second delay
  }
  pressStartTime = undefined;
  pressedButton = undefined;
});

button.addEventListener("mousedown", () => {
  pressStartTime = Date.now(); // Record the time when the button is pressed
});

function setIncrement(times, clikedButton) {
  incrementTimes = times; // Set the increment value, times variable is LECTURA in Spanish.
  if (clikedButton == 1) {
    pressedButton = false;
  } else if (clikedButton == 0) {
    pressedButton = true;
  } else {
    pressedButton = undefined;
  }
}
