// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  todaysDate();
  displayTimeBlocks();
  compareHour();
  getAppointments();
  displayAppointments();

  $('.saveBtn').on('click', function(e) {
    e.preventDefault();
    var savedInputs = $(this).siblings('.description').attr('id');
    console.log(savedInputs);
    dailyTimeBlocks[savedInputs].textarea = $(this).siblings('.description').val();
    console.log(dailyTimeBlocks[savedInputs].textarea);
    saveAppointments();
  });
});

var dailyTimeBlocks = [
  {
    index: 0,
    hour: "09",
    time: "9:00",
    am_pm: "am"
  },

  {
    index: 1,
    hour: "10",
    time: "10:00",
    am_pm: "am"
  },

  {
    index: 2,
    hour: "11",
    time: "11:00",
    am_pm: "am"
  },

  {
    index: 3,
    hour: "12",
    time: "12:00",
    am_pm: "pm"
  },

  {
    index: 4,
    hour: "13",
    time: "1:00",
    am_pm: "pm"
  },

  {
    index: 5,
    hour: "14",
    time: "2:00",
    am_pm: "pm"
  },

  {
    index: 6,
    hour: "15",
    time: "3:00",
    am_pm: "pm"
  },
  
  {
    index: 7,
    hour: "16",
    time: "4:00",
    am_pm: "pm"
  },

  {
    index: 8,
    hour: "17",
    time: "5:00",
    am_pm: "pm"
  },
]

function todaysDate() {
  var date = dayjs();
  $('#currentDay').text(date.format('MMM D, YYYY'));
};

function createRow() {
  var row = $('<div>')
  .attr('class', 'row time-block');

  $('.container-lg').append(row);
};

function createTime(i) {
  var dailyTime = $('<div>')
  .attr('class', 'd-flex col-2 col-md-1 hour justify-content-around align-items-center py-3');

  dailyTime.text(dailyTimeBlocks[i].time + dailyTimeBlocks[i].am_pm);
  $('.time-block:last-child').append(dailyTime);
};

function createTextArea(i) {
  var appointment = $('<textarea>')
  .attr('class', 'col-8 col-md-10 description')
  .attr('rows', '3')
  .attr('id', i);

  $('.time-block:last-child').append(appointment);
  dailyTimeBlocks[i].textarea = appointment;
};

function createSaveButton() {
  var saveButton = $('<button>').attr('class', 'btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
  var icon = $('<i>').attr('class', 'fas fa-save').attr('aria-hidden', 'true');
  $('.time-block:last-child').append(saveButton);
  $(saveButton).append(icon);
};

function displayTimeBlocks() {
  for (var i = 0; i < dailyTimeBlocks.length; i += 1) {
    createRow();
    createTime(i);
    createTextArea(i);
    createSaveButton();
  };
};

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

function saveAppointments() {
  localStorage.setItem("dailyTimeBlocks", JSON.stringify(dailyTimeBlocks));
};

function getAppointments() {
  var update = JSON.parse(localStorage.getItem("dailyTimeBlocks"));

  if (update) {
    dailyTimeBlocks = update;
  }
};

function displayAppointments() {
    for (var i = 0; i < dailyTimeBlocks.length; i++) {
      var allTextAreas = $('#' + i);
      allTextAreas[0].value = dailyTimeBlocks[i].textarea;
      console.log(dailyTimeBlocks[i].textarea);
    }; 
};

