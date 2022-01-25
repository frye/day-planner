const workDayFisrtH = 9 // Setting the start of the workday to 9AM
const workDayLastH = 17 // Setting the last working hour to start at 5PM

var blockContainer = $('.container');

// Format and display the current date in the hero section.
var currentDate = moment().format('dddd, MMM Do');
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

    blockSection.addClass('row time-block');

    // Set the time field
    blockTime.text(blockHour + ':00');
    blockTime.addClass('col-2 hour');

    // Check localStorage for saved content for the hour in question
    eventText = localStorage.getItem(blockTime.text()) || '';
    if (eventText) {
        blockInput.text(eventText);
    }

    // Create the textarea with potentially earlier saved data.
    blockInput.addClass('col-8');
    if ( blockHour < now ) {
        blockInput.addClass('past');
    } else if ( blockHour === now ) {
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

var clickHandler = function(event) {
    // Save the text from the textarea inside the current time-block. Use the hour as a key.
    localStorage.setItem(event.delegateTarget.children[0].innerText, event.delegateTarget.children[1].value)
}

for (var i = workDayFisrtH; i<= workDayLastH; i++) {
    blockContainer.append(newTimeBlock(i));
}

// Set up the click handler on the time-block and use delegation.
$('section').on('click', 'button', clickHandler);