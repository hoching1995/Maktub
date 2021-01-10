var dateArray = getDateBetween("2015/01/01", "2026/01/01");
var defaultDate = new Date();
var currentView = defaultDate;
var defaultInpt = "";
var ul = document.createElement('ul');
ul.className = "days";
printCalendar(dateArray, defaultInpt);

function getDateBetween(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    startDate = settingDate(startDate, 31) // setting the start date as the last date of the month
    endDate = settingDate(endDate, 31)
    var temp;
    var dateArray = [];
    while (startDate <= endDate) {
        if (startDate.getDate() != 31) {
            temp = settingDate(startDate, 0);
            if (temp >= start && temp <= end) {
                dateArray.push(temp);
            }
            startDate = settingDate(startDate, 31)
        } else {
            temp = new Date(startDate);
            if (temp >= start && temp <= end) {
                dateArray.push(temp)
            }
            startDate.setMonth(startDate.getMonth() + 1);
        }
    }
    return dateArray;
}

function settingDate(date, day) {
    date = new Date(date) // pasting a string of date, returning js format of date
    date.setDate(day) // then set the day 
    return date;
}

function getTodayDate(input) {
    if (input.toString().substring(8, 9) == "0") {
        return input = input.toString().substring(9, 10);
    } else
        return input.toString().substring(8, 10);
}

function printCalendar(dateArray, inputdate) {
    var currentday = new Date();
    var todaydate = getTodayDate(currentday);
    var currentyear = currentday.getFullYear();
    var currnetmonth = getMonthFunction(currentday.getMonth());
    var currentmonthshort = currnetmonth.substring(0, 3);
    var beginingOftheMonth = 0;
    var endOfmonth = 0;
    var isCurrentMonth = true;
    var isfutureMonth = false;

    var li = document.createElement('li');
    ul.innerHTML = "";
    if (inputdate != "") {
        var ulelement = document.getElementsByClassName("days")
        var oldMonth = currnetmonth;
        var oldMonthInNum = currentday.getMonth();
        var oldCurrentYear = currentday.getFullYear();
        ulelement.innerHTML = ""

        currentday = new Date(inputdate);
        todaydate = getTodayDate(currentday);
        currentyear = currentday.getFullYear();
        currnetmonth = getMonthFunction(currentday.getMonth());
        currentmonthshort = currnetmonth.substring(0, 3);

        beginingOftheMonth = 0;
        var monthInNum = currentday.getMonth();


        isCurrentMonth = false;
        if (oldMonth == currnetmonth && currentyear == oldCurrentYear) {
            isCurrentMonth = true;
        }
        if (monthInNum >= oldMonthInNum && currentyear >= oldCurrentYear) {
            isfutureMonth = true;
        }
    }

    for (i = 0; i < dateArray.length; i++) {
        var tempMonth = dateArray[i].toString().substring(4, 7);
        var tempYear = dateArray[i].toString().substring(11, 15);
        if (tempMonth == currentmonthshort && tempYear == currentyear) {
            beginingOftheMonth = checkBeginingOfTheMonth(dateArray[i - 1].toString().substring(0, 3));
            endOfmonth = dateArray[i].toString().substring(8, 10);
        }
    }

    for (k = 0; k < beginingOftheMonth; k++) {
        var li = document.createElement('li');
        li.innerHTML = "";
        ul.appendChild(li);
    }
    for (k = 1; k <= endOfmonth; k++) {
        var li = document.createElement('li');
        if (!isCurrentMonth && !isfutureMonth) {
            li.innerHTML = `<span class="passeddate">${k}</span>`;
        } else
        if ((todaydate > k && isCurrentMonth && !isfutureMonth)) {
            li.innerHTML = `<span class="passeddate">${k}</span>`;
        } else
        if (todaydate == k && isCurrentMonth) {
            li.innerHTML = `<span class="active">${k}</span>`;
        } else
            li.innerHTML = k;
        ul.appendChild(li);
    }

    // content.appendChild(ul);
    document.getElementById("days_div").appendChild(ul);
    document.getElementById("yearCalendar").innerHTML = currentyear;
    document.getElementById("monthCalendar").innerHTML = currnetmonth
}


function checkBeginingOfTheMonth(input) {
    var begingWeekDayMap = new Map();
    begingWeekDayMap.set('Mon', '1');
    begingWeekDayMap.set('Tue', '2');
    begingWeekDayMap.set('Wed', '3');
    begingWeekDayMap.set('Thu', '4');
    begingWeekDayMap.set('Fri', '5');
    begingWeekDayMap.set('Sat', '6');
    begingWeekDayMap.set('Sun', '0');
    var begingWeekDay = begingWeekDayMap.get(input)
    return begingWeekDay;
}

function getMonthFunction(input) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[input];
}

function changeMonth(isNextmonth) {
    var nextmonth = currentView.getMonth();
    var year = currentView.getFullYear();
    var day = currentView.getDate();

    if (isNextmonth) {
        if (nextmonth + 1 == 12) {
            nextmonth = 0, year = year + 1
        } else
            nextmonth = nextmonth + 1;
    } else {
        if (nextmonth - 1 == -1) {
            nextmonth = 11,
                year = year - 1
        } else
            nextmonth = nextmonth - 1;
    }
    currentView = new Date(year + "/0" + (nextmonth + 1) + "/" + day);
    var currentViewDate = year + "/0" + (nextmonth + 1) + "/" + day
    printCalendar(dateArray, currentViewDate);
}

function nextmonth() {
    var isNextmonth = true;
    changeMonth(isNextmonth)
}

function prevMonth() {
    var isNextmonth = false;
    changeMonth(isNextmonth)
}

function search() {
    //getting the input 
    const searchInput = document.getElementById('SearchInput');
    const suggestionsPanel = document.querySelector('.suggestions');
    searchInput.addEventListener('keyup', function() {
        const input = searchInput.value;
        suggestionsPanel.innerHTML = '';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'productspecs.json', true);
        xhr.send(null);
        xhr.onload = function() {

            if (xhr.status === 200) {
                var responseObject = JSON.parse(xhr.responseText);
                console.log(responseObject.Women.length);
                var counter = 1;
                for (var i = 0; i < responseObject.Women.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.Women[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.Women[i].Productname)
                        suggestions = responseObject.Women[i].Productname;
                        const div = document.createElement("div");
                        div.innerHTML =
                            `
                        <div>
                            <a href="${responseObject.Women[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
                for (var i = 0; i < responseObject.Man.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.Man[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.Man[i].Productname)
                        suggestions = responseObject.Man[i].Productname;
                        const div = document.createElement('div');
                        div.innerHTML = `
                        <div>
                            <a href="${responseObject.Man[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
                for (var i = 0; i < responseObject.AppleProductCase.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.AppleProductCase[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.AppleProductCase[i].Productname)
                        suggestions = responseObject.AppleProductCase[i].Productname;
                        const div = document.createElement('div');
                        div.innerHTML = `
                        <div>
                            <a href="${responseObject.AppleProductCase[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
                for (var i = 0; i < responseObject.Accessories.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.Accessories[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.Accessories[i].Productname)
                        suggestions = responseObject.Accessories[i].Productname;
                        const div = document.createElement('div');
                        div.innerHTML = `
                        <div>
                            <a href="${responseObject.Accessories[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
            }
        }
    })
}

function loadcart() {
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    var cartCount = document.getElementById("cart-count")
    if (!cartCurrentNumber) {
        //if cart is 0 then print 0 instead of null 
        cartCount.setAttribute('data-count', 0);
    } else
    //else the number
        cartCount.setAttribute('data-count', cartCurrentNumber);
}

document.getElementById("nextMonthBtn").addEventListener("click", ("click", () => { nextmonth(); }));
document.getElementById("prevMonthBtn").addEventListener("click", ("click", () => { prevMonth(); }));
search();
loadcart();