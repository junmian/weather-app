const newDate = new Date();
const footerYear = document.getElementById("current-year");
const currentYear = newDate.getFullYear();

const displayCurrentYear = () => {
  footerYear.textContent = currentYear;
}

displayCurrentYear();