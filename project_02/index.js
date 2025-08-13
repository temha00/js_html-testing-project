console.log("hello");
var contact = [];
function myFunc() {
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    var genderId = getGenderId(el5);
    setValues({
        firstName: el1.value,
        lastName: el2.value,
        address: el3.value,
        phone: el4.value,
        genderId: genderId
    });
    console.log(setValues);
    myOutput();
    console.log(myOutput);
}
function getGenderId(el5) {
    var retval = "";
    for (var i = 0; i < el5.options.length; i++) {
        if (el5.options[i].selected == true) {
            retval = el5.options[i].value;
        }
    }
    return retval;
}
function setValues(newEntry) {
    contact.push(newEntry);
}
function myOutput() {
    var output = document.getElementById("output");
    for (var i = 0; contact.length; i++) {
        output = contact[i];
    }
}
//# sourceMappingURL=index.js.map