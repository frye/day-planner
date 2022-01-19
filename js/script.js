const workDayFisrtH = 9 //9AM
const workDayLastH = 17 //5PM

var blockContainer = $('.container');


// Use jQuery to create a time block
var newTimeBlock = function (blockHour) {
    var blockSection = $('<section>');
    var blockTime = $('<time>');
    var blockInput = $('<input>');
    var blockButton = $('<button>');

    blockSection.addClass('row time-block');

    blockTime.text(blockHour);
    blockTime.addClass('col-2 hour');

    blockInput.addClass('col-8 past');

    blockButton.text('Save');
    blockButton.addClass('col-2 saveBtn')

    blockSection.append(blockTime);
    blockSection.append(blockInput);
    blockSection.append(blockButton);

    return blockSection;
}

for (var i = workDayFisrtH; i<= workDayLastH; i++) {
    blockContainer.append(newTimeBlock(i + ':00'));
}
