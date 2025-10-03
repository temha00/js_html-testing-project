console.log("hello");
var ContactFuncs_Cls = (function () {
    function ContactFuncs_Cls() {
    }
    ContactFuncs_Cls.prototype.saveEntry = function () {
        var idEl = document.getElementById("idField");
        var el1 = document.getElementById("input1");
        var el2 = document.getElementById("input2");
        var el3 = document.getElementById("input3");
        var el4 = document.getElementById("input4");
        var el5 = document.getElementById("input5");
        var el5val = this.getSelectVal(el5);
        var contact = {
            id: idEl.value,
            firstName: el1.value,
            lastName: el2.value,
            phone: el3.value,
            address: el4.value,
            genderId: el5val
        };
        this.add_or_edit_Contact(contact);
        hideModal();
        toastr.success("Contact is saved.");
    };
    ContactFuncs_Cls.prototype.getSelectVal = function (el5) {
        var retval = "";
        for (var i = 0; i < el5.options.length; i++) {
            if (el5.options[i].selected == true) {
                retval = el5.options[i].value;
            }
        }
        return retval;
    };
    ContactFuncs_Cls.prototype.renderOutput = function (contacts) {
        var _this = this;
        var outputEl = document.getElementById("output");
        if (outputEl != null) {
            outputEl.innerHTML = "";
        }
        var outerEl = $("<div clas='x-outer'>").text("contacts count = " + contacts.length)[0];
        outputEl.appendChild(outerEl);
        var elTable = $("<table class='table table-bordered table-striped table-hover'>").get(0);
        outerEl.appendChild(elTable);
        var elTableHeaderRow = $("<tr>").get(0);
        elTable.appendChild(elTableHeaderRow);
        elTableHeaderRow.appendChild($("<th>Id</th>").get(0));
        elTableHeaderRow.appendChild($("<th>First Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Last Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Phone Number</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Address</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Gender</th>").get(0));
        elTableHeaderRow.appendChild($("<th colspan='2'>Remove/Edit Entry</th>").get(0));
        var _loop_1 = function (i) {
            var item = contacts[i];
            var genderText = this_1.getGenderText(item.genderId);
            var elTableDataRow = $("<tr>").get(0);
            elTable.appendChild(elTableDataRow);
            elTableDataRow.appendChild($("<td>" + item.id + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.firstName + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.lastName + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.phone + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.address + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + genderText + "</td>").get(0));
            var elButtonDelete = $("<td><button type='button' class='btn btn-danger x-delete'>Remove</td>").get(0);
            elButtonDelete.onclick = function () {
                _this.deleteContact(item.id);
            };
            elTableDataRow.appendChild(elButtonDelete);
            var elButtonEdit = $("<td><button type='button' class='btn btn-primary x-edit'>Edit</td>").get(0);
            elButtonEdit.onclick = function () {
                _this.openEditModal(item.id);
            };
            elTableDataRow.appendChild(elButtonEdit);
        };
        var this_1 = this;
        for (var i = 0; i < contacts.length; i++) {
            _loop_1(i);
        }
    };
    ContactFuncs_Cls.prototype.getGenderText = function (genderId) {
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
    };
    ContactFuncs_Cls.prototype.openEditModal = function (itemId) {
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
    };
    ContactFuncs_Cls.prototype.openNewEntryModal = function () {
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
    };
    ContactFuncs_Cls.prototype.refreshContacts = function () {
        var _this = this;
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: function (contactsOnServer) {
                _this.renderOutput(contactsOnServer);
            },
            error: function (xhr, status, error) {
                console.error("Error fetching contacts:", error);
            }
        });
    };
    ContactFuncs_Cls.prototype.add_or_edit_Contact = function (contact_add_or_edit) {
        var _this = this;
        var reqData = {
            action: "save",
            contact: contact_add_or_edit,
        };
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: function () {
                _this.refreshContacts();
            },
            error: function (xhr, status, error) {
                console.error("Error posting contact:", error);
            }
        });
    };
    ContactFuncs_Cls.prototype.deleteContact = function (contactId) {
        var _this = this;
        var reqData = {
            action: "delete",
            id: contactId
        };
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: function () {
                _this.refreshContacts();
            },
            error: function (xhr, status, error) {
                console.error("Error delete contact:", error);
            }
        });
    };
    return ContactFuncs_Cls;
}());
var contactFuncs = new ContactFuncs_Cls();
$(function () {
    var btnSaveEl = $(document).find(".x-main-save").get(0);
    btnSaveEl.onclick = function () {
        contactFuncs.saveEntry();
    };
    contactFuncs.refreshContacts();
});
//# sourceMappingURL=index2.js.map