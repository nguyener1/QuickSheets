//Time Validation

function isAllNumbers(str){
    
    for (var x = 0; x < str.length; x++){
        var c = str.charAt(x);
        if (c == ':') continue;
        if (isNaN(c) || c == ' ') return false;
    }
    return true;
    
}

function isTime(str){
    
    if (str == null){
        //console.log('is null');
        return false;
    }

    if (count(str, ':') >= 2){
        //console.log('too many colons');
        return false;
    }

    if (!isAllNumbers(str)){
        //console.log('not all numbers');
        return false;
    }
    return true;
    
}

function sumOfHoursAsMin( list ){

    var sum = 0;

    for (var i = 0; i < list.length; i++){

        var hourMin;

        var time = list[i];

        hourMin = parseTime(time);
        sum += ( parseInt( hourMin[0] ) * 60 ) + parseInt(hourMin[1]);

    }

    return sum;
}

function parseTime( time ){
    var hh = '', mm = '', i = 0;

    while (time[i] != ':'){
        hh += time.charAt(i);
        i++;
    }

    i++;

    while (i <= time.length){
        mm += time.charAt(i);
        i++;
    }

    return [hh,mm];
}

function convertTo12Hour( time ){
                
    var PM, hh, hour;
    PM = true;
    hh = time.charAt(0) + time.charAt(1);
    hour = parseInt(hh);

    if (hour == 24 || hour == 0) {
        hour = 12;
        PM = false;
    } else if (hour > 12) {
        hour = hour % 12;
    } else if (hour < 12) {
        PM = false;
    }

    time = hour.toString(10) + ':' + time.substring(3,5);

    if (PM) {
        time += ' PM';
    } else {
        time += ' AM';
    }

    return time;
}

function getNumericalMeridianTime( time ) {
    
    var hh, hour;
    hh = time.charAt(0) + time.charAt(1);
    hour = parseInt(hh);

    if (hour == 24 || hour == 0) {
        hour = 12;
    } else if (hour > 12) {
        hour = hour % 12;
    }

    time = hour.toString(10) + ':' + time.substring(3,5);
    
    return time;
}
            
function autoCompleteTime(str){
    
    if (str == null){
        //console.log('empty field');
        return;
    }
    
    if (!isTime(str)){
        //console.log(str + ' is not a time');
        return str;
    }
    
    var a = count(str,':');
    var hh,mm;
    switch (a){
        case 0:

            hh = getHH(str);
            mm = '00'
            return hh + ':' + mm;

        case 1:

            var hour = getHourSide(str);
            var min  = getMinSide(str);

            hh = getHH(hour);
            mm = getMM(min);

            return hh + ':' + mm;
    }
    
}

function count(str, char){
    var results = 0;
    
    for (var i = 0; i < str.length; i++){
        if (str[i] === char){
            results++;
        }
    }
    
    return results;
}

//accpets hh:mm string, returns hh or h
function getHourSide (str){
    
    var hh = '';
    
    if (str == null || str == ''){
        return hh;
    }
    
    for (var i = 0; i < str.length; i++){
        if (str[i] == ':'){
            return hh;
        }
        hh = hh + str[i];
    }
    
    return hh;
}

function getMinSide (str){
    
    var mm = '';
    
    if (str == null || str == ''){
        return mm;
    }
    
    for (var i = str.length - 1; i >= 0; i--){
        if (str[i] == ':')
            return mm;
        mm = str[i] + mm;
    }
    
    return mm;
}
      
function getHH(str){
    
    if (str == ''){
        return '';
    }
    
    var hh = str;
        
        if (isNaN(hh)){
            return hh;
        }
    
        if (parseInt(hh) < 1 && parseInt(hh) > 12){
            
        } else {
            return hh;
        }
  
}

//takes in a string assumed to be two digits or less
function getMM(min){
    
    if (min == '' || min == '00'){
        return '00';
    }
    
    var mm = min;
    
        if (isNaN(min)) {
            return mm;
        }
        if (min.length == 1) {
            mm = min + '0';
        }
        if (min.length > 2) {
            mm = min[0] + min[1];
        }
        if (parseInt(min) >= 60){
            return mm;
        }
        
        return mm;

}
      
function appendZeros(count, num){
    
    var str = num;
    var i   = 0;
    
    while (i < count) {
        str = str + '0';
        i++;
    }
    return num;
}

/* AutoComplete */

function autoComplete(){
    
}

function reloadHours(){
    
}

/* Animation */

function swapText( e, textToReplace, milliseconds ){
    
    e.animate( {'opacity': 0 }, milliseconds, function() {
        $(this).text(textToReplace)
    }).animate({'opacity': 1}, milliseconds);
    
}

function fadeOut( e, milliseconds) {
    e.animate( {'opacity': 0}, milliseconds, function() {
        $(this).css('display', 'none')
    });
}

function fadeIn( e, milliseconds) {
//    var el = document.getElementById(e);
    
//    e.style.opacity = 0
    e.css({'opacity' : 0})
      e.css('display', 'block')
    
    e.animate( {'opacity': 1}, milliseconds, function() {
        $(this).css('display', 'block')
    });
}
