const GOOD_COORDS = 0;
const STR_NOT_NUM = 1;
const OUT_OF_RANGE = 2;

const BAD_COORD_VALUE = -999;

let arrayOfPoints = [];
let PointPretedent = [BAD_COORD_VALUE, BAD_COORD_VALUE];

window.onload = function () {
    let submit = document.getElementById("send");
    submit.addEventListener("click", checkAndSend);

    getStartCanvas();

    let selectR = document.getElementById("iR");
    selectR.addEventListener("change",
        function() {arrayOfPoints = []; getStartCanvas()}
    );

    let canvas = document.getElementById("canvas");
    canvas.addEventListener("click", getMouseCoordsOnClick);

    getXAndY();

    const XHR = new XMLHttpRequest();1
    let CoordsQueryStr = "/lab_2/?getTable=true";
    XHR.open("GET", CoordsQueryStr, false);
    XHR.send(null);
    XHR.addEventListener("load", console.log(XHR.status), false);

    getTableRows(XHR);
}

function getStartCanvas() {
    const RADIUS = 100;
    let canvas = document.getElementById("canvas");
    let cntx = canvas.getContext("2d");

    cntx.clearRect(0, 0, canvas.width, canvas.height);
    cntx.fillStyle = "#0000FF";

    cntx.fillRect(canvas.width / 2 - RADIUS, canvas.height / 2 - RADIUS / 2, RADIUS, RADIUS / 2);

    cntx.beginPath();
    cntx.arc(canvas.width / 2, canvas.height / 2, RADIUS / 2, 0.5 * Math.PI, Math.PI, false);
    cntx.closePath();
    cntx.fill();

    cntx.beginPath();
    cntx.moveTo(canvas.width / 2, canvas.height / 2 + RADIUS / 2);
    cntx.lineTo(canvas.width / 2, canvas.height / 2);
    cntx.lineTo(canvas.width / 2 - RADIUS / 2, canvas.height / 2);
    cntx.closePath();
    cntx.fill();

    cntx.beginPath();
    cntx.moveTo(canvas.width / 2, canvas.height / 2 + RADIUS / 2);
    cntx.lineTo(canvas.width / 2, canvas.height / 2);
    cntx.lineTo(canvas.width / 2 + RADIUS / 2, canvas.height / 2);
    cntx.closePath();
    cntx.fill();

    cntx.fillStyle = "#000000";

    cntx.beginPath();
    cntx.moveTo(canvas.width / 2, canvas.height / 2 + RADIUS * 1.4);
    cntx.lineTo(canvas.width / 2, canvas.height / 2 - RADIUS * 1.4);
    cntx.closePath();
    cntx.stroke();

    cntx.beginPath();
    cntx.moveTo(canvas.width / 2 + RADIUS * 1.4, canvas.height / 2);
    cntx.lineTo(canvas.width / 2 - RADIUS * 1.4, canvas.height / 2);
    cntx.closePath();
    cntx.stroke();

    cntx.fillStyle = "#00FF00";

    for (let i = 0; i < arrayOfPoints.length; i++) {
        cntx.beginPath();
        cntx.arc(arrayOfPoints[i][0], arrayOfPoints[i][1], 4, 0, 2 * Math.PI, false);
        cntx.closePath();
        cntx.fill();
    }
}

function getXAndY() {
    let x_coord = document.getElementsByName("x")[0].value;
    let y_coord = document.getElementsByName("y")[0].value;
    let radius = document.getElementsByName("R")[0].value;

    let x_elem = document.getElementById("x_coord");
    x_elem.innerHTML = "X: " + x_coord;
    let y_elem = document.getElementById("y_coord");
    y_elem.innerHTML = "Y: " + y_coord;
    let radius_elem = document.getElementById("radius");
    radius_elem.innerHTML = "Radius: " + radius;
}

function setXAndYByClick(x_mouse, y_mouse) {
    let radius = parseFloat(document.getElementsByName("R")[0].value);
    let x_coord = x_mouse * radius / 100;
    let y_coord = y_mouse * radius / 100;

    let x_input = document.getElementsByName("x")[0];
    x_input.value = x_coord;

    let y_input = document.getElementsByName("y")[0];
    y_input.value = y_coord;
}
function setX(x) {
    let x_inputs = document.getElementsByClassName("input_x");

    for (let i = 0; i < x_inputs.length; i++) {
        if (x_inputs[i].value != x) {
            x_inputs[i].checked = false;
        }
    }

    let hidden_x_input = document.getElementsByName("x")[0];
    hidden_x_input.value = x;
    getXAndY();
}
function checkAndSend() {
    let CoordsAndStatus = checkCoordinates();

    if (CoordsAndStatus[0] === GOOD_COORDS) {
        let xStr = CoordsAndStatus[1];
        let yStr = CoordsAndStatus[2];
        let Rstr = CoordsAndStatus[3];
        let XHR = sendCoords(xStr, yStr, Rstr);
        getTableRows(XHR);

        if (JSON.stringify(PointPretedent) !== JSON.stringify([BAD_COORD_VALUE, BAD_COORD_VALUE])) {
            arrayOfPoints.push(PointPretedent);
            getStartCanvas();
            PointPretedent = [BAD_COORD_VALUE, BAD_COORD_VALUE];
        }

    } else {
        let infoElem = document.getElementById("info_text");
        if (CoordsAndStatus[0] === STR_NOT_NUM) {
            infoElem.innerHTML = "Enter decimal Number, not a String."
        } else if (CoordsAndStatus[0] === OUT_OF_RANGE) {
            infoElem.innerHTML = "Some of entered values out of range."
        }
    }
}
function checkCoordinates() {
    let x = document.getElementsByName("x")[0].value;
    let y = document.getElementsByName("y")[0].value;
    let r = document.getElementsByName("R")[0].value;

    let x_num = parseFloat(x);
    let y_num = parseFloat(y);
    let r_num = parseFloat(r);

    let RETURN_CODE = GOOD_COORDS;

    if (Object.is(x_num, NaN) || Object.is(y_num, NaN) || Object.is(r_num, NaN)) {
        RETURN_CODE = STR_NOT_NUM;
    } else if (x_num.toString() != x || y_num.toString() != y || r_num.toString() != r) {
        RETURN_CODE = STR_NOT_NUM;
    } else if (x_num < -3 || x_num > 5 || y_num < -3 || y_num > 3 || r_num < 1 || r_num > 5) {
        RETURN_CODE = OUT_OF_RANGE;
    }

    return [RETURN_CODE, x, y, r];
}
function sendCoords(x, y, r) {
    const XHR = new XMLHttpRequest();
    let CoordsQueryStr = "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&R=" + encodeURIComponent(r);
    XHR.open("POST", "/lab_2/", false);
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send(CoordsQueryStr);

    XHR.addEventListener("load", console.log(XHR.status), false);
    return XHR;
}
function getTableRows(XHR) {
    let tableRowsStr = XHR.responseText;

    let table =  document.getElementById("results_table");
    while (table.childElementCount !== 1) {
        table.removeChild(table.lastElementChild);
    }

    tableRowsStr = tableRowsStr.split("\n");

    for (let i = 0; i < tableRowsStr.length; i++) {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = tableRowsStr[i];
        table.appendChild(tableRow);
    }
}

function getMouseCoordsOnClick(event) {
    let clickArea = document.getElementById("canvas");
    let x_mouse = Math.round(event.clientX - clickArea.getBoundingClientRect().left - clickArea.getBoundingClientRect().width / 2);
    let y_mouse = Math.round(clickArea.getBoundingClientRect().height / 2 - event.clientY + clickArea.getBoundingClientRect().top);

    console.log(x_mouse, y_mouse);
    setXAndYByClick(x_mouse, y_mouse);
    getXAndY();
    let x_AreaAxis = Math.round(event.clientX - clickArea.getBoundingClientRect().left);
    let y_AreaAxis = Math.round(event.clientY - clickArea.getBoundingClientRect().top);
    addPointOnClick(x_AreaAxis, y_AreaAxis);
}

function addPointOnClick(x_AreaAxis, y_AreaAxis) {
    getStartCanvas();
    let canvas = document.getElementById("canvas");
    let cntx = canvas.getContext("2d");
    console.log(x_AreaAxis, y_AreaAxis);
    cntx.fillStyle = "#FF0000";
    cntx.beginPath();
    cntx.arc(x_AreaAxis, y_AreaAxis, 4, 0, 2 * Math.PI, false);
    cntx.closePath();
    cntx.fill();

    PointPretedent = [x_AreaAxis, y_AreaAxis];
}