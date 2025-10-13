console.log("hello");
function saveEntry() {
    var idEl = document.getElementById("idField");
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var el3 = document.getElementById("input3");
    var el4 = document.getElementById("input4");
    var el5 = document.getElementById("input5");
    var el5val = getSelectVal(el5);
    var contact = {
        id: idEl.value,
        firstName: el1.value,
        lastName: el2.value,
        phone: el3.value,
        address: el4.value,
        genderId: el5val
    };
    if (idEl.value == "0") {
        addContact(contact);
    }
    else {
        editContact(contact);
    }
    hideModal();
    toastr.success("Contact is saved.");
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
function renderOutput(contacts) {
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
        arr.push("<td>" + item.phone + "</td>");
        arr.push("<td>" + item.address + "</td>");
        arr.push("<td>" + genderText + "</td>");
        arr.push("<td><button type='button' class='btn btn-danger' onclick='deleteContact(" + item.id + ")' >Remove</button></td>");
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
function resetEntries() {
}
function openEditModal(itemId) {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact",
        method: "GET",
        dataType: null,
        success: function (contacts) {
            var contact = contacts.filter(function (x) { return x.id == itemId; })[0];
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
            el3.value = contact.phone;
            el4.value = contact.address;
            el5.value = contact.genderId;
            $(document).find(".modal-title").text("Edit Contact");
            showModal();
        },
        error: function (xhr, status, error) {
            console.error("Error fetching contacts:", error);
        }
    });
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
function refreshContacts() {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact",
        method: "GET",
        dataType: null,
        success: function (contactsOnServer) {
            renderOutput(contactsOnServer);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching contacts:", error);
        }
    });
}
function addContact(newContact) {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newContact),
        success: function () {
            refreshContacts();
        },
        error: function (xhr, status, error) {
            console.error("Error posting contact:", error);
        }
    });
}
function editContact(editedContact) {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact/" + editedContact.id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(editedContact),
        success: function () {
            refreshContacts();
        },
        error: function (xhr, status, error) {
            console.error("Error updating contact:", error);
        }
    });
}
function deleteContact(contactId) {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact/" + contactId,
        method: "DELETE",
        success: function () {
            refreshContacts();
        },
        error: function (xhr, status, error) {
            console.error("Error delete contact:", error);
        }
    });
}
$(function () {
    refreshContacts();
});
//# sourceMappingURL=index2.js.map