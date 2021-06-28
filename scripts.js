function fadeIn(){
    var redval = 0;
    var greenval = 0;
    var blueval = 0;
    var opacityval = 0;
    var fadeInInterval = setInterval(() => {
        redval++;
        greenval++;
        blueval++;
        opacityval += 1/255;
        document.getElementById("player").style.opacity = opacityval;
        document.getElementById("enemy").style.opacity = opacityval;
        document.body.style.backgroundColor = 'rgb(' + redval + ',' + greenval + ',' + blueval + ')';
        if (a==255){window.clearInterval(fadeInInterval);}
    }, 0.2);
}
window.onload = fadeIn();
var moveInterval;
// document.addEventListener("keydown", function(event) {
//     if (event.key == "w") {
//         var moveInterval = setInterval(() => {//}, interval);
//         document.getElementById("player").style.left = parseInt(getComputedStyle(document.getElementById('player')).left) + 1 +"px"
//         document.addEventListener("keyup", function(event) {
//             if (event.key == "w") {
//                 window.clearInterval(moveInterval)
//         }
//           });
//     }, 0,01);
//     }
// });

// Movement start //
var leftSpeed = 0;
var rightSpeed = 0;
var upSpeed = 0;
var downSpeed = 0;
document.addEventListener("keydown", function(event) {
    if (event.key =="w"){
        upSpeed = 2,5;
    } else if (event.key =="s"){
        downSpeed = 2,5;
    }
    if (event.key =="d"){
        rightSpeed = 2,5;
    } else if (event.key =="a"){
        leftSpeed = 2,5;
    }
    
});

document.addEventListener("keyup", function(event) {
    if (event.key =="d"){
        rightSpeed = 0;
    }
    if (event.key =="a"){
        leftSpeed = 0;
    }
    if (event.key =="w"){
        upSpeed = 0;
    }
    if (event.key =="s"){
        downSpeed = 0;
    }
});
var rightInterval = setInterval(() => {
    if (rightSpeed == 2,5 && leftSpeed == 0 && findSide("player", "right") >= 0){
    document.getElementById("player").style.left = parseInt(getComputedStyle(document.getElementById('player')).left) + rightSpeed +"px"
    }
}, 0.001);
var leftInterval = setInterval(() => {
    if (leftSpeed == 2,5 && rightSpeed == 0 && findSide("player", "left") != 0){
    document.getElementById("player").style.left = parseInt(getComputedStyle(document.getElementById('player')).left) - leftSpeed +"px"
    }
}, 0.001);

var upInterval = setInterval(() => {
    if (upSpeed == 2,5 && downSpeed == 0 && findSide("player", "top") != 0){
    document.getElementById("player").style.top = parseInt(getComputedStyle(document.getElementById('player')).top) - upSpeed +"px"
    }
}, 0.001);
var downInterval = setInterval(() => {
    if (downSpeed == 2,5 && upSpeed == 0 && findSide("player", "bottom") != 1){
    document.getElementById("player").style.top = parseInt(getComputedStyle(document.getElementById('player')).top) + downSpeed +"px"
    }
}, 0.001);
// Movement End //

function findSide(divId,aSide){
    var elem = document.getElementById(divId);
    if (aSide =="left" || aSide == "top"){return parseInt(getComputedStyle(elem).getPropertyValue(aSide))}
    else if(aSide == "right"){return parseInt(getComputedStyle(elem).getPropertyValue(aSide)) + parseInt(window.innerWidth) - parseInt(getComputedStyle(elem).width);}
    else if (aSide == "bottom"){return parseInt(getComputedStyle(elem).getPropertyValue(aSide)) + parseInt(window.innerHeight) - parseInt(getComputedStyle(elem).height);}
}
var bullet = 1;
function shootFunc(){
    var elem = document.getElementById("player");
    var div = document.createElement("div");
    div.setAttribute("id", "bullet" + bullet)
    div.style.width = "10px";
    div.style.position = "fixed";
    var middle = parseInt(findSide("player","left")) + (parseInt(getComputedStyle(elem).width)/2 - 5);
    var center = parseInt(findSide("player","top")) + (parseInt(getComputedStyle(elem).height)/2 - 5);
    div.style.left = middle + "px";
    div.style.top = center + "px";
    div.style.height = "10px";
    div.style.background = "red";
    document.getElementById("body").appendChild(div);
    setInterval(() => {
        div.style.left = parseInt(getComputedStyle(div).left) + 10 +"px"
        if(parseInt(getComputedStyle(div).left) == parseInt(findSide("enemy", "left"))){removeElement("enemy")
    }
    }, 0,1);
}


function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}



document.addEventListener("keydown", function(event) {
    if (event.key ==" "){
        shootFunc()
    }
});

google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }