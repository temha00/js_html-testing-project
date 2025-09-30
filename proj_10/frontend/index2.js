console.log("hello");
var page = '';
page = page || 'main';
var ContactFuncs_Cls = (function () {
    function ContactFuncs_Cls() {
    }
    ContactFuncs_Cls.prototype.saveContactEntry = function () {
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
        $('#myModal').modal('hide');
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
    ContactFuncs_Cls.prototype.render_Contacts_Output = function (contacts) {
        var _this = this;
        var outputEl = document.getElementById("container");
        if (outputEl != null) {
            outputEl.innerHTML = "";
        }
        var btnReturn = $("<button type=\"button\" class=\"btn x-small btn-secondary\">Return</button>").appendTo(outputEl)[0];
        btnReturn.onclick = function () {
            page = 'main';
            refreshPage();
        };
        var btnContactRefresh = $("<button type=\"button\" class=\"btn x-small btn-primary\">Refresh</button>").appendTo(outputEl)[0];
        btnContactRefresh.onclick = function () {
            _this.refreshContacts();
        };
        var btnContactAddNew = $("<button type=\"button\" class=\"btn x-small btn-primary\">Add New Entry</button>").appendTo(outputEl)[0];
        btnContactAddNew.onclick = function () {
            _this.openNewEntryModal();
        };
        var outerEl = $("<div class='x-outer'>").text("contacts count = " + contacts.length)[0];
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
            var genderText = this_1.getContactGenderText(item.genderId);
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
                _this.openContactEdit(item.id);
            };
            elTableDataRow.appendChild(elButtonEdit);
        };
        var this_1 = this;
        for (var i = 0; i < contacts.length; i++) {
            _loop_1(i);
        }
    };
    ContactFuncs_Cls.prototype.getContactGenderText = function (genderId) {
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
    ContactFuncs_Cls.prototype.openContactEdit = function (itemId) {
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
                $('#myModal').modal('show');
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
        $('#myModal').modal('show');
    };
    ContactFuncs_Cls.prototype.refreshContacts = function () {
        var _this = this;
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: function (contactsOnServer) {
                _this.render_Contacts_Output(contactsOnServer);
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
var CompanyFuncs_Cls = (function () {
    function CompanyFuncs_Cls() {
    }
    CompanyFuncs_Cls.prototype.saveCompanyEntry = function () {
        var idEl = document.getElementById("id_company");
        var el1 = document.getElementById("input_company_name");
        var company = {
            id: idEl.value,
            companyName: el1.value,
        };
        this.add_or_edit_Company(company);
        $('#myModal2').modal('hide');
        toastr.success("Company is saved.");
    };
    CompanyFuncs_Cls.prototype.render_Companies_Output = function (companies) {
        var _this = this;
        var outputEl = document.getElementById("container");
        if (outputEl != null) {
            outputEl.innerHTML = "";
        }
        var btnReturn = $("<button type=\"button\" class=\"btn x-small btn-secondary\">Return</button>").appendTo(outputEl)[0];
        btnReturn.onclick = function () {
            page = 'main';
            refreshPage();
        };
        var btnCompanyRefresh = $("<button type=\"button\" class=\"btn x-small btn-primary\">Refresh</button>").appendTo(outputEl)[0];
        btnCompanyRefresh.onclick = function () {
            _this.refreshCompanies();
        };
        var btnCompanyAddNew = $("<button type=\"button\" class=\"btn x-small btn-primary\" onclick=\"contactFuncs.openNewEntryModal()\">Add New Entry</button>").appendTo(outputEl)[0];
        btnCompanyAddNew.onclick = function () {
            _this.openNewCompanyEntry();
        };
        var outerEl = $("<div class='x-outer'>").text("companies count = " + companies.length)[0];
        outputEl.appendChild(outerEl);
        var elTable = $("<table class='table table-bordered table-striped table-hover'>").get(0);
        outerEl.appendChild(elTable);
        var elTableHeaderRow = $("<tr>").get(0);
        elTable.appendChild(elTableHeaderRow);
        elTableHeaderRow.appendChild($("<th>Company Id</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Company Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th colspan='2'>Remove/Edit Entry</th>").get(0));
        var _loop_2 = function (i) {
            var item = companies[i];
            var elTableDataRow = $("<tr>").get(0);
            elTable.appendChild(elTableDataRow);
            elTableDataRow.appendChild($("<td>" + item.id + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.companyName + "</td>").get(0));
            var elButtonDelete = $("<td><button type='button' class='btn btn-danger x-delete'>Remove</td>").get(0);
            elButtonDelete.onclick = function () {
                _this.deleteCompany(item.id);
            };
            elTableDataRow.appendChild(elButtonDelete);
            var elButtonEdit = $("<td><button type='button' class='btn btn-primary x-edit'>Edit</td>").get(0);
            elButtonEdit.onclick = function () {
                _this.openCompanyEdit(item.id);
            };
            elTableDataRow.appendChild(elButtonEdit);
        };
        for (var i = 0; i < companies.length; i++) {
            _loop_2(i);
        }
    };
    CompanyFuncs_Cls.prototype.openCompanyEdit = function (itemId) {
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: function (contacts) {
                var company = contacts.filter(function (x) { return x.id == itemId; })[0];
                console.log(company);
                var idEl = document.getElementById("id_company");
                var el1 = document.getElementById("input_company_name");
                idEl.value = "" + company.id;
                el1.value = company.firstName;
                $(document).find(".modal-title").text("Edit Company");
                $('#myModal2').modal('show');
            },
            error: function (xhr, status, error) {
                console.error("Error fetching contacts:", error);
            }
        });
    };
    CompanyFuncs_Cls.prototype.openNewCompanyEntry = function () {
        var idEl = document.getElementById("id_company");
        var el1 = document.getElementById("input_company_name");
        idEl.value = "0";
        el1.value = "";
        $(document).find(".modal-title").text("New Company");
        $('#myModal2').modal('show');
    };
    CompanyFuncs_Cls.prototype.refreshCompanies = function () {
        var _this = this;
        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "GET",
            dataType: null,
            success: function (companiesOnServer) {
                _this.render_Companies_Output(companiesOnServer);
            },
            error: function (xhr, status, error) {
                console.error("Error fetching contacts:", error);
            }
        });
    };
    CompanyFuncs_Cls.prototype.add_or_edit_Company = function (company_add_or_edit) {
        var _this = this;
        var reqData = {
            action: "save",
            company: company_add_or_edit,
        };
        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: function () {
                _this.refreshCompanies();
            },
            error: function (xhr, status, error) {
                console.error("Error posting contact:", error);
            }
        });
    };
    CompanyFuncs_Cls.prototype.deleteCompany = function (companyId) {
        var _this = this;
        var reqData = {
            action: "delete",
            id: companyId
        };
        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: function () {
                _this.refreshCompanies();
            },
            error: function (xhr, status, error) {
                console.error("Error delete contact:", error);
            }
        });
    };
    return CompanyFuncs_Cls;
}());
function render_main_Output() {
    var outputEl = document.getElementById("container");
    if (outputEl != null) {
        outputEl.innerHTML = "";
    }
    var mainPageName = $("<label>Main Page</label><br>").appendTo(outputEl)[0];
    var btnContactPageOpen = $("<button type=\"button\" class=\"btn btn-primary\">").appendTo(outputEl)[0];
    btnContactPageOpen.onclick = function () {
        page = 'contact';
        refreshPage();
    };
    var btnCompanyPageOpen = $("<button type=\"button\" class=\"btn btn-primary\">").appendTo(outputEl)[0];
    btnCompanyPageOpen.onclick = function () {
        page = 'company';
        refreshPage();
    };
}
var contactFuncs = new ContactFuncs_Cls();
var companyFuncs = new CompanyFuncs_Cls();
function refreshPage() {
    if (page == 'main') {
        render_main_Output();
    }
    else if (page == 'contact') {
        contactFuncs.refreshContacts();
    }
    else if (page == 'company') {
        companyFuncs.refreshCompanies();
    }
}
$(function () {
    var btnSaveEl_Contact = $(document).find(".x-contact-save").get(0);
    btnSaveEl_Contact.onclick = function () {
        contactFuncs.saveContactEntry();
    };
    var btnSaveEl_Company = $(document).find(".x-company-save").get(0);
    btnSaveEl_Company.onclick = function () {
        companyFuncs.saveCompanyEntry();
    };
    refreshPage();
});
//# sourceMappingURL=index2.js.map