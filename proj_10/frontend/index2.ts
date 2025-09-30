console.log("hello");


//for creating contact array and objects
interface Company {
    id?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    genderId?: string;
}

interface Company {
    id?: string;
    companyName?: string;
}

type PageTypes = 'main' | 'contact' | 'company';

let page = '';
page = page || 'main';


class ContactFuncs_Cls {
    //main function for adding and displaying an entry
    saveContactEntry() {
        let idEl = document.getElementById("idField") as HTMLInputElement;
        let el1 = document.getElementById("input1") as HTMLInputElement;
        let el2 = document.getElementById("input2") as HTMLInputElement;
        let el3 = document.getElementById("input3") as HTMLInputElement;
        let el4 = document.getElementById("input4") as HTMLInputElement;
        let el5 = document.getElementById("input5") as HTMLSelectElement;
        let el5val = this.getSelectVal(el5);

        let contact: Company = {
            id: idEl.value,
            firstName: el1.value,
            lastName: el2.value,
            phone: el3.value,
            address: el4.value,
            genderId: el5val
        };

        this.add_or_edit_Contact(contact);

        //
        ($('#myModal') as any).modal('hide');

        //
        toastr.success("Contact is saved.");

    }

    //get the value that is given to the option on the html
    getSelectVal(el5: HTMLSelectElement): string {

        let retval = "";

        for (let i = 0; i < el5.options.length; i++) {

            if (el5.options[i].selected == true) {
                retval = el5.options[i].value
            }

        }

        return retval;

    }


    //the function that renders the output
    render_Contacts_Output(contacts: Company[]) {

        let outputEl = document.getElementById("container") as HTMLDivElement;

        if (outputEl != null) {
            outputEl.innerHTML = "";
        }

        let btnContactRefresh = $(`<button type="button" class="btn x-small btn-primary">Refresh</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnContactRefresh.onclick = () => {
            this.refreshContacts();
        }

        let btnContactAddNew = $(`<button type="button" class="btn x-small btn-primary">Add New Entry</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnContactAddNew.onclick = () => {
            this.openNewEntryModal();
        }

        let outerEl = $("<div class='x-outer'>").text("contacts count = " + contacts.length)[0]
        outputEl.appendChild(outerEl);

        let elTable = $("<table class='table table-bordered table-striped table-hover'>").get(0)
        outerEl.appendChild(elTable);

        let elTableHeaderRow = $("<tr>").get(0);
        elTable.appendChild(elTableHeaderRow);

        elTableHeaderRow.appendChild($("<th>Id</th>").get(0));
        elTableHeaderRow.appendChild($("<th>First Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Last Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Phone Number</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Address</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Gender</th>").get(0));
        elTableHeaderRow.appendChild($("<th colspan='2'>Remove/Edit Entry</th>").get(0));

        for (let i = 0; i < contacts.length; i++) {

            let item = contacts[i];

            let genderText = this.getContactGenderText(item.genderId);

            let elTableDataRow = $("<tr>").get(0);
            elTable.appendChild(elTableDataRow);

            elTableDataRow.appendChild($("<td>" + item.id + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.firstName + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.lastName + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.phone + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.address + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + genderText + "</td>").get(0));

            let elButtonDelete = $("<td><button type='button' class='btn btn-danger x-delete'>Remove</td>").get(0);
            elButtonDelete.onclick = () => {
                this.deleteContact(item.id);
            }
            elTableDataRow.appendChild(elButtonDelete);


            let elButtonEdit = $("<td><button type='button' class='btn btn-primary x-edit'>Edit</td>").get(0);
            elButtonEdit.onclick = () => {
                this.openContactEdit(item.id);
            }
            elTableDataRow.appendChild(elButtonEdit);

        }

    }

    getContactGenderText(genderId: string) {
        let genderText = "";
        if (genderId == "0") {
            genderText = "N/A";
        } else if (genderId == "1") {
            genderText = "male";
        } else if (genderId == "2") {
            genderText = "female";
        }
        return genderText;
    }

    // //
    // resetEntries() {
    //     // localContacts = [];

    //     // //is this correct?
    //     // counter = 0;

    //     // let idFieldResetEntries = document.getElementById("idField") as HTMLInputElement;
    //     // idFieldResetEntries.value = "0";

    //     // //
    //     // renderOutput();

    // }


    openContactEdit(itemId: string) {

        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contacts: Company[]) => {

                let contact = contacts.filter(x => x.id == itemId)[0];
                console.log(contact)

                //
                let idEl = document.getElementById("idField") as HTMLInputElement;
                let el1 = document.getElementById("input1") as HTMLInputElement;
                let el2 = document.getElementById("input2") as HTMLInputElement;
                let el3 = document.getElementById("input3") as HTMLInputElement;
                let el4 = document.getElementById("input4") as HTMLInputElement;
                let el5 = document.getElementById("input5") as HTMLSelectElement;

                idEl.value = "" + contact.id;
                el1.value = contact.firstName;
                el2.value = contact.lastName;
                el3.value = contact.phone;
                el4.value = contact.address;
                el5.value = contact.genderId;

                $(document).find(".modal-title").text("Edit Contact");

                //
                ($('#myModal') as any).modal('show');
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });


    }

    openNewEntryModal() {
        let idEl = document.getElementById("idField") as HTMLInputElement;
        let el1 = document.getElementById("input1") as HTMLInputElement;
        let el2 = document.getElementById("input2") as HTMLInputElement;
        let el3 = document.getElementById("input3") as HTMLInputElement;
        let el4 = document.getElementById("input4") as HTMLInputElement;
        let el5 = document.getElementById("input5") as HTMLSelectElement;

        idEl.value = "0";
        el1.value = "";
        el2.value = "";
        el3.value = "";
        el4.value = "";
        el5.value = "0";

        $(document).find(".modal-title").text("New Contact");

        //show modal
        ($('#myModal') as any).modal('show');
    }

    refreshContacts(): void {
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contactsOnServer: Company[]) => {
                this.render_Contacts_Output(contactsOnServer);
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });
    }

    // Add a new contact or edit an existing contact
    add_or_edit_Contact(contact_add_or_edit: Company): void {

        let reqData = {
            action: "save",
            contact: contact_add_or_edit,
        }


        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "POST",
            contentType: "application/json", // important
            data: JSON.stringify(reqData),
            success: () => {
                this.refreshContacts()
            },
            error: (xhr, status, error) => {
                console.error("Error posting contact:", error);
            }
        });
    }

    deleteContact(contactId: string): void {

        let reqData = {
            action: "delete",
            id: contactId
        }

        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: () => {
                this.refreshContacts()
            },
            error: (xhr, status, error) => {
                console.error("Error delete contact:", error);
            }
        });
    }

}

class CompanyFuncs_Cls {
    saveCompanyEntry() {
        let idEl = document.getElementById("id_company") as HTMLInputElement;
        let el1 = document.getElementById("input_company_name") as HTMLInputElement;


        let company: Company = {
            id: idEl.value,
            companyName: el1.value,
        };

        this.add_or_edit_Company(company);

        //
        ($('#myModal2') as any).modal('hide');

        //
        toastr.success("Company is saved.");

    }

    //the function that renders the output
    render_Companies_Output(companies: Company[]) {

        let outputEl = document.getElementById("output_company") as HTMLDivElement;

        if (outputEl != null) {
            outputEl.innerHTML = "";
        }

        let btnCompanyRefresh = $(`<button type="button" class="btn x-small btn-primary">Refresh</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnCompanyRefresh.onclick = () => {
            this.refreshCompanies();
        }

        let btnCompanyAddNew = $(`<button type="button" class="btn x-small btn-primary" onclick="contactFuncs.openNewEntryModal()">Add New Entry</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnCompanyAddNew.onclick = () => {
            this.openNewCompanyEntry();
        }

        let outerEl = $("<div class='x-outer'>").text("companies count = " + companies.length)[0]
        outputEl.appendChild(outerEl);

        let elTable = $("<table class='table table-bordered table-striped table-hover'>").get(0)
        outerEl.appendChild(elTable);

        let elTableHeaderRow = $("<tr>").get(0);
        elTable.appendChild(elTableHeaderRow);

        elTableHeaderRow.appendChild($("<th>Company Id</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Company Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th colspan='2'>Remove/Edit Entry</th>").get(0));

        for (let i = 0; i < companies.length; i++) {

            let item = companies[i];

            let elTableDataRow = $("<tr>").get(0);
            elTable.appendChild(elTableDataRow);

            elTableDataRow.appendChild($("<td>" + item.id + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.companyName + "</td>").get(0));

            let elButtonDelete = $("<td><button type='button' class='btn btn-danger x-delete'>Remove</td>").get(0);
            elButtonDelete.onclick = () => {
                this.deleteCompany(item.id);
            }
            elTableDataRow.appendChild(elButtonDelete);


            let elButtonEdit = $("<td><button type='button' class='btn btn-primary x-edit'>Edit</td>").get(0);
            elButtonEdit.onclick = () => {
                this.openCompanyEdit(item.id);
            }
            elTableDataRow.appendChild(elButtonEdit);

        }

    }

    openCompanyEdit(itemId: string) {

        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contacts: Company[]) => {

                let company = contacts.filter(x => x.id == itemId)[0];
                console.log(company)

                //
                let idEl = document.getElementById("id_company") as HTMLInputElement;
                let el1 = document.getElementById("input_company_name") as HTMLInputElement;

                idEl.value = "" + company.id;
                el1.value = company.firstName;


                $(document).find(".modal-title").text("Edit Company");

                //
                ($('#myModal2') as any).modal('show');
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });


    }

    openNewCompanyEntry() {
        let idEl = document.getElementById("id_company") as HTMLInputElement;
        let el1 = document.getElementById("input_company_name") as HTMLInputElement;

        idEl.value = "0";
        el1.value = "";

        $(document).find(".modal-title").text("New Company");

        //show modal
        ($('#myModal2') as any).modal('show');
    }

    refreshCompanies(): void {
        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "GET",
            dataType: null,
            success: (companiesOnServer: Company[]) => {
                this.render_Companies_Output(companiesOnServer);
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });
    }

    // Add a new contact or edit an existing contact
    add_or_edit_Company(company_add_or_edit: Company): void {

        let reqData = {
            action: "save",
            company: company_add_or_edit,
        }


        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "POST",
            contentType: "application/json", // important
            data: JSON.stringify(reqData),
            success: () => {
                this.refreshCompanies()
            },
            error: (xhr, status, error) => {
                console.error("Error posting contact:", error);
            }
        });
    }

    deleteCompany(companyId: string): void {

        let reqData = {
            action: "delete",
            id: companyId
        }

        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: () => {
                this.refreshCompanies()
            },
            error: (xhr, status, error) => {
                console.error("Error delete contact:", error);
            }
        });
    }
}

function render_main_Output() {
    let outputEl = document.getElementById("container") as HTMLDivElement;

    if (outputEl != null) {
        outputEl.innerHTML = "";
    }

    let mainPageName = $(`<label>Main Page</label><br>`).appendTo(outputEl)[0] as HTMLLabelElement

    let btnContactPageOpen = $(`<button type="button" class="btn btn-primary">`).appendTo(outputEl)[0] as HTMLButtonElement
    btnContactPageOpen.onclick = () => {
        page = 'contact'
        refreshPage();
    }

    let btnCompanyPageOpen = $(`<button type="button" class="btn btn-primary">`).appendTo(outputEl)[0] as HTMLButtonElement
    btnCompanyPageOpen.onclick = () => {
        page = 'company'
        refreshPage();
    }


}

let contactFuncs = new ContactFuncs_Cls();
let companyFuncs = new CompanyFuncs_Cls();

function refreshPage() {
    //pages
    if (page == 'main') {
        render_main_Output();
    } else if (page == 'contact') {
        contactFuncs.refreshContacts();
    } else if (page == 'company') {
        companyFuncs.refreshCompanies();
    }
}

$(() => {

    let btnSaveEl_Contact = $(document).find(".x-contact-save").get(0)
    btnSaveEl_Contact.onclick = () => {
        contactFuncs.saveContactEntry()
    }


    let btnSaveEl_Company = $(document).find(".x-company-save").get(0)
    btnSaveEl_Company.onclick = () => {
        companyFuncs.saveCompanyEntry()
    }

    refreshPage();
})

