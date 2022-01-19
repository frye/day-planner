const workDayFisrtH = 9 //9AM
const workDayLastH = 17 //5PM

var blockContainer = $('.container');

var currentDate = moment().format('dddd, MMM Do');
$('#currentDay').text(currentDate);

    //var now = moment().hour(); //hardcoded below for testing. Swap for real deal.
    var now = 14;

// Use jQuery to create a time block
var newTimeBlock = function (blockHour) {




    var blockSection = $('<section>');
    var blockTime = $('<time>');
    var blockInput = $('<textarea>');
    var blockButton = $('<button>');

    blockSection.addClass('row time-block');

    blockTime.text(blockHour + ':00');
    blockTime.addClass('col-2 hour');

    eventText = localStorage.getItem(blockTime.text()) || '';
    if (eventText) {
        blockInput.text(eventText);
    }

    blockInput.addClass('col-8');
    if ( blockHour < now ) {
        blockInput.addClass('past');
    } else if ( blockHour === now ) {
        blockInput.addClass('present');
    } else {
        blockInput.addClass('future');
    }
    blockInput.css('color', 'black');

    blockButton.text('Save');
    blockButton.addClass('col-2 saveBtn')

    blockSection.append(blockTime);
    blockSection.append(blockInput);
    blockSection.append(blockButton);

    return blockSection;
}

var clickHandler = function(event) {
    localStorage.setItem(event.delegateTarget.children[0].innerText, event.delegateTarget.children[1].value)
}

for (var i = workDayFisrtH; i<= workDayLastH; i++) {
    blockContainer.append(newTimeBlock(i));
}

$('section').on('click', 'button', clickHandler);