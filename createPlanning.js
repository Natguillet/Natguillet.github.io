function createTimeIndication() {
    var date = new Date();
    var n = date.getTimezoneOffset();
    var utc = n / 60;
    var timeList = document.createElement('ul');
    for (let i = 0; i < 8.5; i += 0.5) {
        var item = document.createElement('li');
        var text = document.createElement('span');
        if (Math.trunc(i) == i) {
            text.textContent = Math.trunc(i) + 14 - utc + ":00";
        } else {
            text.textContent = Math.trunc(i) + 14 - utc + ":30";
        }

        item.appendChild(text);
        timeList.appendChild(item);

    }
    document.getElementsByClassName('cd-schedule__timeline')[0].appendChild(timeList);
}

function createEvent() {
    $.getJSON("./planning.json", function(json) {
        var dayList = document.createElement('ul');
        for (day in json) {
            var group = document.createElement('li');
            group.setAttribute('class', 'cd-schedule__group');
            var text = document.createElement('span');
            text.textContent = day;
            var infoDiv = document.createElement('div');
            infoDiv.setAttribute('class', 'cd-schedule__top-info');
            infoDiv.appendChild(text);
            group.appendChild(infoDiv);

            if (json[day].length != 0) {
                var listEvent = document.createElement('ul');
                json[day].forEach(event => {
                    updateHours(event);
                    var scheduleEvent = document.createElement('li');
                    scheduleEvent.setAttribute('class', 'cd-schedule__event');
                    var eventInfo = document.createElement('a');
                    eventInfo.setAttribute('class', 'data-event');
                    eventInfo.setAttribute('data-start', event.begin);
                    eventInfo.setAttribute('data-end', event.end);
                    eventInfo.setAttribute('data-event', event.eventName);
                    var title = document.createElement('em');
                    title.setAttribute('class', 'cd-schedule__name');
                    title.textContent = event.eventName;
                    eventInfo.appendChild(title);
                    scheduleEvent.appendChild(eventInfo);
                    listEvent.appendChild(scheduleEvent);
                    group.appendChild(listEvent);
                });
            }
            dayList.appendChild(group);
        }
        document.getElementsByClassName('cd-schedule__events')[0].appendChild(dayList);
        loadPlanning();
    });
}

function updateHours(event) {
    var date = new Date();
    var n = date.getTimezoneOffset();
    var utc = n / 60;
    var realHoursBegin = parseInt(event.begin[0] + event.begin[1]);
    event.begin = realHoursBegin + 4 - utc + event.begin.substring(2, event.begin.length);
    if (event.end[0] != ".") {
        var realHoursEnd = parseInt(event.end[0] + event.end[1]);
        event.end = realHoursEnd + 4 - utc + event.end.substring(2, event.begin.length);
    }
}

createTimeIndication();
createEvent();