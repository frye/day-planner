const workDayFisrtH = 9 //9AM
const workDayLastH = 17 //5PM

var blockContainer = $('.container');


// Use jQuery to create a time block
var newTimeBlock = function (blockHour) {

    //var now = moment().hour(); //hardcoded below for testing. Swap for real deal.
    var now = 14;
    console.log(now);


    var blockSection = $('<section>');
    var blockTime = $('<time>');
    var blockInput = $('<textarea>');
    var blockButton = $('<button>');

    blockSection.addClass('row time-block');

    blockTime.text(blockHour + ':00');
    blockTime.addClass('col-2 hour');

    blockInput.addClass('col-8');
    if ( blockHour < now ) {
        blockInput.addClass('past');
    } else if ( blockHour === now ) {
        blockInput.addClass('present');
    } else {
        blockInput.addClass('future');
    }

    blockButton.text('Save');
    blockButton.addClass('col-2 saveBtn')

    blockSection.append(blockTime);
    blockSection.append(blockInput);
    blockSection.append(blockButton);

    return blockSection;
}

for (var i = workDayFisrtH; i<= workDayLastH; i++) {
    blockContainer.append(newTimeBlock(i));
}
