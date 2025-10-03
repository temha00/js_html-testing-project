console.log("hello");
var contacts = [];
var counter = 0;
function addEntry() {
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    var el5val = getSelectVal(el5);
    counter++;
    var contact = {
        id: counter,
        firstName: el1.value,
        lastName: el2.value,
        address: el3.value,
        phone: el4.value,
        genderId: el5val
    };
    contacts.push(contact);
    renderOutput();
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
function renderOutput() {
    var outputEl = document.getElementById("output");
    var arr = [];
    arr.push("contacts count = " + contacts.length + "<br>");
    for (var i = 0; i < contacts.length; i++) {
        var item = contacts[i];
        var genderText = "";
        if (item.genderId == "1") {
            genderText = "male";
        }
        else {
            genderText = "female";
        }
        arr.push("Id : " + item.id + "<br>" +
            "Name : " + item.firstName + "<br>" +
            "Surname : " + item.lastName + "<br>" +
            "Address : " + item.address + "<br>" +
            "Phone : " + item.phone + "<br>" +
            "Gender : " + genderText + "<br>" +
            "<button type='button' onclick='removeEntry(" + item.id + ")' >Remove</button>" +
            "<br>");
    }
    console.log(arr);
    outputEl.innerHTML = arr.join("");
}
function removeEntry(itemId) {
    var arr = [];
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id != itemId) {
            arr.push(contacts[i]);
        }
    }
    contacts = arr;
    renderOutput();
}
function resetEntries() {
    contacts = [];
    renderOutput();
}
//# sourceMappingURL=index.js.map