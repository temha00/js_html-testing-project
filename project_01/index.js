console.log("hello");
function myFunc() {
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    console.log(el1.value);
    console.log(el2.checked);
    console.log(el3.value);
    var el4val = getSelectVal(el4);
    console.log(el4val);
    var el1val = el1.value;
    var el2valstr;
    if (el2.checked == true) {
        el2valstr = "checked";
    }
    else {
        el2valstr = "unchecked";
    }
    var el3val = el3.value;
    var values = setValues(el1val, el2valstr, el3val, el4val);
    console.log(values);
}
function getSelectVal(el4) {
    var retVal = "";
    for (var i = 0; i < el4.length; i++) {
        if (el4.options[i].selected == true) {
            retVal = el4.options[i].value;
        }
    }
    return retVal;
}
var storedValues = [];
function setValues(el1val, el2val, el3val, el4val) {
    var valuesArray = [el1val, el2val, el3val, el4val];
    for (var i = 0; i < valuesArray.length; i++) {
        storedValues[i] = valuesArray[i];
    }
    console.log(storedValues);
    return valuesArray;
}
function myOutput() {
    var el3 = document.getElementById("output");
    el3.innerHTML =
        "Textbox : " + storedValues[0] + "<br>" +
            "Checkbox : " + storedValues[1] + "<br>" +
            "Textarea : " + storedValues[2] + "<br>" +
            "Select : " + storedValues[3];
}
//# sourceMappingURL=index.js.map