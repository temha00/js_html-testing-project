console.log("hello");
var Gender;
(function (Gender) {
    Gender["male"] = "1";
    Gender["female"] = "2";
})(Gender || (Gender = {}));
console.log(Gender.male, Gender.female);
var storedValues = [];
function myFunc() {
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    console.log(el1.value);
    console.log(el2.value);
    console.log(el3.value);
    console.log(el4.value);
    var el5val = getSelectVal(el5);
    console.log(el5val);
    var valuesSent = {
        firstName: el1.value,
        lastName: el2.value,
        address: el3.value,
        phone: el4.value,
        gender: el5val
    };
    var values = setValues(valuesSent);
    console.log(values);
    myOutput();
}
function getSelectVal(el5) {
    var retval = "";
    for (var i = 0; i < el5.options.length; i++) {
        if (el5.options[i].selected == true) {
            retval = el5.options[i].value;
        }
    }
    return retval;
}
function setValues(valuesSent) {
    var valuesArray = [valuesSent];
    for (var i = 0; i < valuesArray.length; i++) {
        storedValues[i] = valuesArray[i];
    }
    console.log(storedValues);
    return valuesSent;
}
function myOutput() {
    var divEl = document.getElementById("output");
    for (var i = 0; i < storedValues.length; i++) {
        var genderOutput = storedValues[i].gender;
        if (genderOutput == Gender.male) {
            genderOutput = "male";
        }
        else {
            genderOutput = "female";
        }
        divEl.innerHTML =
            "Name : " + storedValues[i].firstName + "<br>" +
                "Surname : " + storedValues[i].lastName + "<br>" +
                "Address : " + storedValues[i].address + "<br>" +
                "Phone : " + storedValues[i].phone + "<br>" +
                "Gender : " + genderOutput;
    }
}
//# sourceMappingURL=index.js.map