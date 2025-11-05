// Apply linear gradient based on time of day
function setDynamicBackground() {
  const pstHour = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', hour12: false });
  const cstHour = new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai', hour: 'numeric', hour12: false });

  const pstGradient = getGradientForTime(pstHour);
  const cstGradient = getGradientForTime(cstHour);

  // Linear gradient from top to bottom (90deg)
  document.getElementById('pst-section').style.background = `linear-gradient(180deg, ${pstGradient.join(', ')})`;
  document.getElementById('cst-section').style.background = `linear-gradient(180deg, ${cstGradient.join(', ')})`;
}

// Initialize static background
document.addEventListener('DOMContentLoaded', () => {
  setDynamicBackground();
  setInterval(() => setStaticBackground(), 60000); // Update gradient every minute
});


// Gradients based on time
const gradients = {
  morning: ['#F0BD8B', '#E3B0AB', '#F68966'],
  afternoon: ['#ECAFA5', '#D7B0B9', '#A9B2C3'],
  night: ['#B1ACBF', '#617599', '#464F88']
};

function getGradientForTime(hour) {
  if (hour >= 9 && hour < 17) return gradients.morning;
  if ((hour >= 17 && hour < 20) || (hour >= 4 && hour < 9)) return gradients.afternoon;
  return gradients.night;
}

//update clock, second hands
let lastSecond = {};

function updateClock(clockId, timeZone) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone }));
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60; // Increment smoothly
  const hours = now.getHours() % 12 + minutes / 60; // Increment smoothly

  const clock = document.getElementById(clockId);
  const hourHand = clock.querySelector('.hour');
  const minuteHand = clock.querySelector('.minute');
  const secondHand = clock.querySelector('.second');

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hours * 30}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minutes * 6}deg)`;

  // Use modulo (360) to prevent the second hand from jumping
  const secondRotation = (seconds * 6) % 360;
  secondHand.style.transition = seconds === 0 ? "none" : "transform 0.05s linear";
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondRotation}deg)`;
}

function updateDate(dateId, timeZone) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone }));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById(dateId).textContent = now.toLocaleDateString('en-US', options);
}

//const preEnteredMessages = [
//  { time: "07:00", pst: "Snoozing my alarm clock right now...", cst: "Getting ready for the morning, hitting the gym if there's time ☕" },
//  { time: "08:00", pst: "Waking up or snoozing more until 9am :D", cst: "OMW to work!" },
//  { time: "10:00", pst: "Making myself a matcha latte or cup of coffee ☕", cst: "Starting work on a new project 💻, going to meetings" },
//  { time: "12:00", pst: "Taking a lunch break on campus, maybe paninis from Northern 🍔", cst: "Lunch time before heading back to work" },
//  { time: "15:00", pst: "Locked-in in my DESMA studio, presenting my project", cst: "Taking a quick break at work, one more meeting left" },
//  { time: "17:00", pst: "End of the day for classes, going home to cook", cst: "Getting off work now, traffic is horrible as always" },
//  { time: "18:00", pst: "Cooking some enoki beef rolls for dinner tonight :P", cst: "Eating dinner with grandpa and grandma🛋️" },
//  { time: "20:00", pst: "Working on math homework and applying to jobs..", cst: "Organizing the room, getting ready to wind down " },
//  { time: "22:00", pst: "More working, or maybe I will hit the gym?", cst: "In some deep sleep 🌙 " },
//  { time: "00:00", pst: "Zzzzz Goodnight ZZzzzz", cst: "Zzzzz Zzzzz Zzzzz" }
//];
//
//function getCurrentMessage(timeZone) {
//  const now = new Date(new Date().toLocaleString('en-US', { timeZone }));
//  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes for easy comparison
//
//  let latestMessage = preEnteredMessages[0]; // Default to earliest message
//  for (let i = 0; i < preEnteredMessages.length; i++) {
//    const messageTime = parseInt(preEnteredMessages[i].time.split(':')[0]) * 60; // Convert to minutes
//    if (currentTime >= messageTime) {
//      latestMessage = preEnteredMessages[i];
//    } else {
//      break;
//    }
//  }
//  return latestMessage;
//}
//
//function updateTypewriterText() {
//  const pstMessage = getCurrentMessage('America/Los_Angeles').pst;
//  const cstMessage = getCurrentMessage('Asia/Shanghai').cst;
//
//  typeWriterAnimation('pst-text', pstMessage);
//  typeWriterAnimation('cst-text', cstMessage);
//}
//
//// Typewriter Animation Fix
//function typeWriterAnimation(elementId, text) {
//  const element = document.getElementById(elementId);
//  let charIndex = 0;
//  let typing = true;
//
//  function type() {
//    if (typing) {
//      element.textContent = text.substring(0, charIndex++);
//      if (charIndex > text.length) {
//        typing = false;
//        setTimeout(type, 2000); // Pause at full text before deleting
//      } else {
//        setTimeout(type, 100);
//      }
//    } else {
//      element.textContent = text.substring(0, charIndex--);
//      if (charIndex <= 0) {
//        typing = true;
//        charIndex = 0; // Ensure it starts from zero again
//        setTimeout(type, 1000); // Pause before restarting
//      } else {
//        setTimeout(type, 50);
//      }
//    }
//  }
//
//  element.textContent = ""; // Ensure the element is cleared before starting
//  type();
//}

// Typewriter
function typeWriterAnimation(elementId, textArray) {
  const element = document.getElementById(elementId);
  let index = 0, charIndex = 0, typing = true;

  function type() {
    if (typing) {
      element.textContent = textArray[index].substring(0, charIndex++);
      if (charIndex > textArray[index].length) {
        typing = false;
        setTimeout(type, 1000);
      } else {
        setTimeout(type, 100);
      }
    } else {
      element.textContent = textArray[index].substring(0, charIndex--);
      if (charIndex < 0) {
        typing = true;
        index = (index + 1) % textArray.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, 50);
      }
    }
  }
  type();
}

//dates
function updateDate(dateId, timeZone) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone }));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById(dateId).textContent = now.toLocaleDateString('en-US', options);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setDynamicBackground();
  setInterval(() => setDynamicBackground(), 60000);

  updateClock('pst-clock', 'America/Los_Angeles');
  updateClock('cst-clock', 'Asia/Shanghai');
  setInterval(() => {
    updateClock('pst-clock', 'America/Los_Angeles');
    updateClock('cst-clock', 'Asia/Shanghai');
  }, 1000);

  updateDate('pst-date', 'America/Los_Angeles');
  updateDate('cst-date', 'Asia/Shanghai');

  typeWriterAnimation('pst-text', ['Locked-in in my DESMA studio, presenting my project']);
  typeWriterAnimation('cst-text', ['In some deep sleep 🌙, Zzzzz Zzzzz Zzzzz']);
});


// Function to initialize everything
//function initializeClockAndText() {
//  setDynamicBackground();
//  updateClock('pst-clock', 'America/Los_Angeles');
//  updateClock('cst-clock', 'Asia/Shanghai');
//  updateDate('pst-date', 'America/Los_Angeles');
//  updateDate('cst-date', 'Asia/Shanghai');
//  updateTypewriterText();
//  
//  setInterval(() => {
//    updateClock('pst-clock', 'America/Los_Angeles');
//    updateClock('cst-clock', 'Asia/Shanghai');
//  }, 1000);
//  
//  setInterval(updateTypewriterText, 60000);
//}
//
//document.addEventListener('DOMContentLoaded', initializeClockAndText);

// Digital Clock Updates
function updateDigitalClock(clockId, timeZone) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone }));
  const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  document.getElementById(clockId).textContent = timeString;
}

setInterval(() => {
  updateDigitalClock('pst-digital', 'America/Los_Angeles');
  updateDigitalClock('cst-digital', 'Asia/Shanghai');
}, 1000);
