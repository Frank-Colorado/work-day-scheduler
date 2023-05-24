// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// This is a function that will load the saved data from local storage
const loadSavedData = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (todos.length > 0) {
    todos.forEach((todo) => {
      const timeBlock = document.getElementById(todo.id);
      const timeBlockText = timeBlock.querySelector("textarea");
      timeBlockText.value = todo.text;
    });
  } else {
    return;
  }
  return;
};

saveTodos = (todoText, todoId) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todo = {
    text: todoText,
    id: todoId,
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// This is a function that will select all timeblock buttons and add an event listener to them
// When the button is clicked, it will save the text in the textarea to local storage
const saveButton = () => {
  const saveBtns = document.querySelectorAll(".saveBtn");
  saveBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const textArea = button.previousElementSibling;
      const textAreaValue = textArea.value;
      const timeBlockId = textArea.parentElement.id;
      saveTodos(textAreaValue, timeBlockId);
    });
  });
};

const checkCurrentDay = (today) => {
  const savedDay = JSON.parse(localStorage.getItem("today"));
  if (savedDay === today) {
    // if the current day is the same as the saved day, then load the saved data
    loadSavedData();
  } else {
    // if the current day is not the same as the saved day, then clear the local storage
    localStorage.clear();
  }
  saveCurrentDay(today);
};

const saveCurrentDay = (today) => {
  localStorage.setItem("today", JSON.stringify(today));
};

const currentDayDisplay = () => {
  const day = dayjs();
  // displays the date and day of the week in the header
  const today = day.format("dddd, MMMM D, YYYY");
  $("#currentDay").text(today);
  checkCurrentDay(today);
};

const currentHour = () => {
  let currentHour = dayjs().hour();
  const timeblocks = document.querySelectorAll(".time-block");
  timeblocks.forEach((timeblock) => {
    if (timeblock.id < currentHour) {
      timeblock.classList.add("past");
    } else if (timeblock.id == currentHour) {
      timeblock.classList.add("present");
    } else {
      timeblock.classList.add("future");
    }
  });
  saveButton();
};

const timeBlockDisplay = () => {
  // displays the time blocks
  timeBlocks.forEach((timeBlock) => {
    const timeblockDiv = document.createElement("div");
    timeblockDiv.classList.add("row", "time-block");
    timeblockDiv.setAttribute("id", `${timeBlock.time}`);
    timeblockDiv.innerHTML = `
    <div class="col-2 col-md-1 hour text-center py-3">${timeBlock.header}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    `;
    $("#timeBlockContainer").append(timeblockDiv);
  });
  currentHour();
};

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

window.onload = function () {
  timeBlockDisplay();
  currentDayDisplay();
};
