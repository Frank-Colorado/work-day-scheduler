// This is a function called loadSavedData
// It has 0 parameters
// It will be called by the 'checkCurrentDay' function
const loadSavedData = () => {
  // This is a variable called todos
  // It is assigned the value of the local storage item 'todos'
  // If there is no local storage item called 'todos', then it is assigned an empty array
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  // This is a conditional statement that checks if the length of the todos array is greater than 0
  if (todos.length > 0) {
    // If the length of the todos array is greater than 0, then
    // the forEach method is called on the todos array
    todos.forEach((todo) => {
      // for each todo the timeblock that matches the todo id is selected
      const timeBlock = document.getElementById(todo.id);
      // the textarea in the timeblock is selected
      const timeBlockText = timeBlock.querySelector("textarea");
      // the value of the textarea is set to the todo text
      timeBlockText.value = todo.text;
    });
    // if there is nothing in the todos array, then the function returns
  } else {
    return;
  }
};

// This is a function called saveTodos
// It has 2 parameters: todoText and todoId
// It will be called by the 'saveButton' function
saveTodos = (text, id) => {
  // This is a variable called todos
  // It is assigned the value of the local storage item 'todos'
  // If there is no local storage item called 'todos', then it is assigned an empty array
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  // This is a variable called todo
  // It is assigned an object with 2 properties: text and id
  // The values of the keys are the values of the parameters in the function
  const todo = {
    text,
    id,
  };
  // The todo object is pushed to the todos array
  todos.push(todo);
  // The todos array is saved to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

// This is a function called saveButton
// It has 0 parameters
// It will be called by the 'currentHour' function
const saveButton = () => {
  // This is a variable called saveBtns
  // It is assigned the value of all the elements with the class 'saveBtn'
  const saveBtns = document.querySelectorAll(".saveBtn");
  // The forEach method is called on the saveBtns array
  saveBtns.forEach((button) => {
    // for each button, an event listener is added
    button.addEventListener("click", () => {
      // the text area is selcted for each button using the previousElementSibling property
      const textArea = button.previousElementSibling;
      // the value of the text area is selected
      const textAreaValue = textArea.value;
      // the id of the timeblock is selected
      const timeBlockId = textArea.parentElement.id;
      // the saveTodos function is called with the text area value and the timeblock id as parameters
      saveTodos(textAreaValue, timeBlockId);
    });
  });
};

// This is a function called saveCurrentDay
// It has 1 parameter: today
// It will be called by the 'checkCurrentDay' function
const saveCurrentDay = (today) => {
  // The today parameter is saved to local storage
  localStorage.setItem("today", JSON.stringify(today));
};

// This is a function called checkCurrentDay
// It has 1 parameter: today
// It will be called by the 'currentDayDisplay' function
const checkCurrentDay = (today) => {
  // This is a variable called savedDay
  // It is assigned the value of the local storage item 'today'
  const savedDay = JSON.parse(localStorage.getItem("today"));
  // A conditional statement that checks if the current day is the same as the saved day
  if (savedDay === today) {
    // if the current day is the same as the saved day, then load the saved data
    loadSavedData();
  } else {
    // if the current day is not the same as the saved day, then clear the local storage
    localStorage.clear();
  }
  // the saveCurrentDay function is called with the today parameter
  saveCurrentDay(today);
};

// This is a function called currentDayDisplay
// It has 0 parameters
// It will be called by the 'window.onload' function
const currentDayDisplay = () => {
  // This is a variable called day
  // It is assigned the value of the dayjs function
  const day = dayjs();
  // The format method is called on the day variable
  // the today variable is assigned the value of the format method
  const today = day.format("dddd, MMMM D, YYYY");
  // The currentDay id is selected and the today variable is assigned as the text
  $("#currentDay").text(today);
  // the checkCurrentDay function is called with the today parameter
  checkCurrentDay(today);
};

// This is a function called currentHour
// It has 0 parameters
// It will be called by the 'timeBlockDisplay' function
const currentHour = () => {
  // This is a variable called currentHour
  // It is assigned the value of the hour method of the dayjs function
  const currentHour = dayjs().hour();
  // This is a variable called timeblocks
  // It is assigned the value of all the elements with the class 'time-block'
  const timeblocks = document.querySelectorAll(".time-block");
  // The forEach method is called on the timeblocks array
  timeblocks.forEach((timeblock) => {
    // for each timeblock, the id is selected
    // if the id is less than the current hour, then the class 'past' is added
    if (timeblock.id < currentHour) {
      timeblock.classList.add("past");
      // if the id is equal to the current hour, then the class 'present' is added
    } else if (timeblock.id == currentHour) {
      timeblock.classList.add("present");
      // otherwise, the class 'future' is added
    } else {
      timeblock.classList.add("future");
    }
  });
  // the saveButton function is called
  saveButton();
};

// This is a function called timeBlockDisplay
// It has 0 parameters
// It will be called by the 'window.onload' function
const timeBlockDisplay = () => {
  // The timeBlocks array is used from the times.js file
  // The forEach method is called on the timeBlocks array
  timeBlocks.forEach((timeBlock) => {
    // for each timeBlock, a div is created
    const timeblockDiv = document.createElement("div");
    // the div is given the classes 'row' and 'time-block'
    timeblockDiv.classList.add("row", "time-block");
    // the div is given the id of the timeBlock time
    timeblockDiv.setAttribute("id", `${timeBlock.time}`);
    // the innerHTML of the div is set to the following:
    timeblockDiv.innerHTML = `
    <div class="col-2 col-md-1 hour text-center py-3">${timeBlock.header}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    `;
    // the timeBlockContainer id is selected and the timeblockDiv is appended
    $("#timeBlockContainer").append(timeblockDiv);
  });
  // the currentHour function is called
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
