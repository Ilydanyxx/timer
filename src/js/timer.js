// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const start = document.querySelector("button[data-start]");
const day = document.querySelector("span[data-days]");
const hour = document.querySelector("span[data-hours]");
const minute = document.querySelector("span[data-minutes]");
const second = document.querySelector("span[data-seconds]");

const f = flatpickr("input#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        let time = selectedDates[0].getTime();
        const now = new Date();

        if (time <= now.getTime()) {
            start.disabled = true;
            window.alert("Please choose a date in the future")
        }
        start.disabled = false;
    }
}
)
function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}
start.addEventListener("click", () => {
    timer = setInterval(() => {
        const dif = f.selectedDates[0].getTime() - new Date().getTime()
        const { days, hours, minutes, seconds } = convertMs(dif);
        if (dif < 1000) {
            clearInterval(timer);
            return
        }
        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);
        
    }, 1000)
    
})

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