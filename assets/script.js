// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  todaysDate();
  displayTimeBlocks();
  compareHour();
  getAppointments();
  displayAppointments();

// Adds event listener for click on save buttons, prevents save button click from clearing
// previous local storage data, updates dailyTimeBlocks array textareas with new user inputs
  $('.saveBtn').on('click', function(e) {
    e.preventDefault();
    var savedInputs = $(this).siblings('.description').attr('id');
    dailyTimeBlocks[savedInputs].textarea = $(this).siblings('.description').val();
    saveAppointments();
  });
});

// Sets array objects for comparisons/displaying information in time block rows
var dailyTimeBlocks = [
  {
    index: 0,
    hour: "09",
    time: "9",
    am_pm: "am"
  },

  {
    index: 1,
    hour: "10",
    time: "10",
    am_pm: "am"
  },

  {
    index: 2,
    hour: "11",
    time: "11",
    am_pm: "am"
  },

  {
    index: 3,
    hour: "12",
    time: "12",
    am_pm: "pm"
  },

  {
    index: 4,
    hour: "13",
    time: "1",
    am_pm: "pm"
  },

  {
    index: 5,
    hour: "14",
    time: "2",
    am_pm: "pm"
  },

  {
    index: 6,
    hour: "15",
    time: "3",
    am_pm: "pm"
  },
  
  {
    index: 7,
    hour: "16",
    time: "4",
    am_pm: "pm"
  },

  {
    index: 8,
    hour: "17",
    time: "5",
    am_pm: "pm"
  },
]

// Adds today's date to header
function todaysDate() {
  var date = dayjs();
  $('#currentDay').text(date.format('MMM D, YYYY'));
};

// Creates div for time block row and appends to time block container
function createRow() {
  var row = $('<div>')
  .attr('class', 'row time-block');

  $('.container-lg').append(row);
};

// Creates div for time field display, centers time in div, appends to last appended row
function createTime(i) {
  var dailyTime = $('<div>')
  .attr('class', 'd-flex col-2 col-md-1 hour justify-content-around align-items-center py-3');

// Adds text value to time field from dailyTimeBlocks array objects
  dailyTime.text(dailyTimeBlocks[i].time + dailyTimeBlocks[i].am_pm);
  $('.time-block:last-child').append(dailyTime);
};

// Creates textareas for user input and appends to last appended row
function createTextArea(i) {
  var appointment = $('<textarea>')
  .attr('class', 'col-8 col-md-10 description')
  .attr('rows', '3')
  .attr('id', i);

  $('.time-block:last-child').append(appointment);

// Adds textarea objects to dailyTimeBlocks array objects for targeting
  dailyTimeBlocks[i].textarea = appointment;
};

// Creates save buttons/icons and appends to last appended row
function createSaveButton() {
  var saveButton = $('<button>').attr('class', 'btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
  var icon = $('<i>').attr('class', 'fas fa-save').attr('aria-hidden', 'true');
  $('.time-block:last-child').append(saveButton);
  $(saveButton).append(icon);
};

// Displays time block rows on page
function displayTimeBlocks() {
  for (var i = 0; i < dailyTimeBlocks.length; i += 1) {
    createRow();
    createTime(i);
    createTextArea(i);
    createSaveButton();
  };
};

// Compares current hour in 24-hour clock format with time block hour values and adds classes
// accordingly for color-coding
function compareHour() {
  var currentHour = dayjs().format('HH');
  dailyTimeBlocks.forEach(function(block) {
      if (block.hour < currentHour) {
        block.textarea.addClass('past')
      } else if (block.hour > currentHour) {
        block.textarea.addClass('future')
      } else {
        block.textarea.addClass('present')
      };
  });
};

// Saves user input to textareas to local storage as strings
function saveAppointments() {
  localStorage.setItem("dailyTimeBlocks", JSON.stringify(dailyTimeBlocks));
};

// Retrieves dailyTimeBlocks array from local storage, updates array if updates are made
function getAppointments() {
  var update = JSON.parse(localStorage.getItem("dailyTimeBlocks"));

  if (update) {
    dailyTimeBlocks = update;
  };
};

// Targets textareas by id and displays user inputs to textareas
function displayAppointments() {
  for (var i = 0; i < dailyTimeBlocks.length; i++) {
    var allTextAreas = $('#' + i);

// If textarea objects have no user input, textareas remain blank, otherwise updates textareas
// with user inputs
    if (typeof dailyTimeBlocks[i].textarea === "object") {
      allTextAreas[0].value = ""
    } else {
      allTextAreas[0].value = dailyTimeBlocks[i].textarea
    };
  }; 
};

