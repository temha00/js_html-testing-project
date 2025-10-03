console.log("hello");
var contacts = [];
var counter = 0;
function saveEntry() {
    var idEl = document.getElementById("idField");
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    var el5val = getSelectVal(el5);
    var id = idEl.value;
    var isNewRec = (id == "0");
    if (isNewRec) {
        counter++;
        var contact = {
            id: counter.toString(),
            firstName: el1.value,
            lastName: el2.value,
            address: el3.value,
            phone: el4.value,
            genderId: el5val
        };
        contacts.push(contact);
    }
    else {
        var contact = getContactObj(id);
        contact.firstName = el1.value;
        contact.lastName = el2.value;
        contact.address = el3.value;
        contact.phone = el4.value;
        contact.genderId = el5.value;
    }
    hideModal();
    toastr.success("Contact is saved.");
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
    arr.push("<table class='table table-bordered table-striped table-hover' >");
    arr.push("<tr>");
    arr.push("<th><b> Id </th>");
    arr.push("<th><b> First Name </th>");
    arr.push("<th><b> Last Name </th>");
    arr.push("<th><b> Phone Number </th>");
    arr.push("<th><b> Address </th>");
    arr.push("<th><b> Gender </th>");
    arr.push("<th colspan='2'><b> Remove/Edit Entry </th>");
    arr.push("</tr>");
    for (var i = 0; i < contacts.length; i++) {
        var item = contacts[i];
        var genderText = getGenderText(item.genderId);
        arr.push("<tr>");
        arr.push("<td>" + item.id + "</td>");
        arr.push("<td>" + item.firstName + "</td>");
        arr.push("<td>" + item.lastName + "</td>");
        arr.push("<td>" + item.address + "</td>");
        arr.push("<td>" + item.phone + "</td>");
        arr.push("<td>" + genderText + "</td>");
        arr.push("<td><button type='button' class='btn btn-danger' onclick='removeEntry(" + item.id + ")' >Remove</button></td>");
        arr.push("<td><button type='button' class='btn btn-primary' onclick='openEditModal(" + item.id + ")' >Edit</button></td>");
        arr.push("</tr>");
    }
    arr.push("</table>");
    console.log(arr);
    outputEl.innerHTML = arr.join("");
}
function getGenderText(genderId) {
    var genderText = "";
    if (genderId == "0") {
        genderText = "N/A";
    }
    else if (genderId == "1") {
        genderText = "male";
    }
    else if (genderId == "2") {
        genderText = "female";
    }
    return genderText;
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
    counter = 0;
    var idFieldResetEntries = document.getElementById("idField");
    idFieldResetEntries.value = "0";
    renderOutput();
}
function getContactObj(itemId) {
    for (var i = 0; i < contacts.length; i++) {
        if (itemId == contacts[i].id) {
            return contacts[i];
        }
    }
}
function openEditModal(itemId) {
    var contact = getContactObj(itemId);
    console.log(contact);
    var idEl = document.getElementById("idField");
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    idEl.value = "" + contact.id;
    el1.value = contact.firstName;
    el2.value = contact.lastName;
    el3.value = contact.address;
    el4.value = contact.phone;
    el5.value = contact.genderId;
    $(document).find(".modal-title").text("Edit Contact");
    showModal();
}
function openNewEntryModal() {
    var idEl = document.getElementById("idField");
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    idEl.value = "0";
    el1.value = "";
    el2.value = "";
    el3.value = "";
    el4.value = "";
    el5.value = "0";
    $(document).find(".modal-title").text("New Contact");
    showModal();
}
//# sourceMappingURL=index2.js.map