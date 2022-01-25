const workDayFisrtH = 9 // Setting the start of the workday to 9AM
const workDayLastH = 17 // Setting the last working hour to start at 5PM

var blockContainer = $('.container');

// Format and display the current date in the hero section.
//var currentDate = moment().format('YYYYMMDD');
var currentDate = moment().format('dddd, MMM Do');
var workedDate = moment();
$('#currentDay').text(currentDate);

var now = moment().hour(); //hardcoded below for testing. Swap for real deal.
//var now = 14;

// Use jQuery to create a time block
var newTimeBlock = function (blockHour) {

    // Set up the elements
    var blockSection = $('<section>');
    var blockTime = $('<time>');
    var blockInput = $('<textarea>');
    var blockButton = $('<button>');

    blockSection.addClass('row time-block hour-row');

    // Set the time field
    blockTime.text(blockHour + ':00');
    blockTime.addClass('col-2 hour');

    // Check localStorage for saved content for the hour in question
    getDateTime = workedDate.format('YYYYMMDD') + blockHour + ':00';
    eventText = localStorage.getItem(getDateTime) || '';
    if (eventText) {
        blockInput.text(eventText);
    }

    // Create the textarea with potentially earlier saved data.
    blockInput.addClass('col-8 blocktext');
    if (blockHour < now) {
        blockInput.addClass('past');
    } else if (blockHour === now) {
        blockInput.addClass('present');
    } else {
        blockInput.addClass('future');
    }
    blockInput.css('color', 'black');

    // Save button
    blockButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>');
    blockButton.addClass('col-2 saveBtn')

    // Add elements to DOM
    blockSection.append(blockTime);
    blockSection.append(blockInput);
    blockSection.append(blockButton);

    return blockSection;
}

var clickHandler = function (event) {
    // Save the text from the textarea inside the current time-block. Use the hour as a key.
    var saveDateTime = workedDate.format('YYYYMMDD') + event.delegateTarget.children[0].innerText;
    console.log(saveDateTime);
    localStorage.setItem(saveDateTime, event.delegateTarget.children[1].value);
    event.delegateTarget.children[1].value = '';
    updateDayTasks();
}

var prevHandler = function() {
    workedDate.subtract(1, 'days'); 
    updateWorkedDay();
    updateDayTasks();
}

var nextHandler = function() {
    workedDate.add(1, 'days');
    updateWorkedDay();
    updateDayTasks();
}

var clearHandler = function() {
    if(confirm('Clear all saved events from local storage?')) {
        localStorage.clear();
        // Empty timeout to make sure the screen refresh takes place. Although spec says local Storage calls should be
        // synchronous it seems not to be the case. This timeout bypasses the behavior.
        setTimeout(()=>{}, 0);
        updateDayTasks();
    }
}

var updateWorkedDay = function() {
    $('.workedDay').text(workedDate.format('dddd, MMM Do'));
}

var updateDayTasks = function () {
    
    var rowArray = $('.blocktext');
    console.log(rowArray);
    var hour = workDayFisrtH;

    for (var i = 0; i < rowArray.length; i++) { 
        rowArray[i].value = '';
        rowArray[i].classList.remove('current', 'past', 'future');
        getDateTime = workedDate.format('YYYYMMDD') + hour + ':00';
        console.log(workedDate);
        eventText = localStorage.getItem(getDateTime) || '';
        console.log(eventText);
        if (eventText) {
            rowArray[i].value = eventText;
        }
        if (workedDate.isBefore(moment(), 'hour')) {
            rowArray[i].classList.add('past');
        } else if (workedDate.isSame(moment(), 'day') && hour === moment.hour) {
            rowArray[i].classList.add('present');
        } else {
            rowArray[i].classList.add('future');
        }
        hour++;
    }
}

var init = function () {

    // Create working header

    updateWorkedDay();

    for (var i = workDayFisrtH; i <= workDayLastH; i++) {
        blockContainer.append(newTimeBlock(i));
    }

    $('.hour-row').on('click', 'button', clickHandler);
    $('.prevBtn').on('click', prevHandler);
    $('.nextBtn').on('click', nextHandler);
    $('.clearButton').on('click', clearHandler);
}

// Set up the click handler on the time-block and use delegation.

init();