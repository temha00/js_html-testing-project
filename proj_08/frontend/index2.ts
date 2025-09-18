console.log("hello");


//for creating contact array and objects
interface Contact {
    id?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    genderId?: string;
}

class ContactFuncs_Cls {
    //main function for adding and displaying an entry
    saveEntry() {
        let idEl = document.getElementById("idField") as HTMLInputElement;
        let el1 = document.getElementById("input1") as HTMLInputElement;
        let el2 = document.getElementById("input2") as HTMLInputElement;
        let el3 = document.getElementById("input3") as HTMLInputElement;
        let el4 = document.getElementById("input4") as HTMLInputElement;
        let el5 = document.getElementById("input5") as HTMLSelectElement;
        let el5val = this.getSelectVal(el5);

        let contact: Contact = {
            id: idEl.value,
            firstName: el1.value,
            lastName: el2.value,
            phone: el3.value,
            address: el4.value,
            genderId: el5val
        };

        if (idEl.value == "0") {
            this.addContact(contact);
        } else {
            this.editContact(contact);
        }

        //
        hideModal();

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
    renderOutput(contacts: Contact[]) {

        let outputEl = document.getElementById("output") as HTMLDivElement;

        if (outputEl != null) {
            outputEl.innerHTML = "";
        }

        let outerEl = $("<div clas='x-outer'>").text("contacts count = " + contacts.length)[0]
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

            let genderText = this.getGenderText(item.genderId);

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
                this.openEditModal(item.id);
            }
            elTableDataRow.appendChild(elButtonEdit);

        }

        // arr.push("<div class='x-outer'>");
        // arr.push("contacts count = " + contacts.length + "<br>");

        // arr.push("<table class='table table-bordered table-striped table-hover' >");
        // arr.push("<tr>");
        // arr.push("<th><b> Id </th>");
        // arr.push("<th><b> First Name </th>");
        // arr.push("<th><b> Last Name </th>");
        // arr.push("<th><b> Phone Number </th>");
        // arr.push("<th><b> Address </th>");
        // arr.push("<th><b> Gender </th>");
        // arr.push("<th colspan='2'><b> Remove/Edit Entry </th>");
        // arr.push("</tr>");

        // for (let i = 0; i < contacts.length; i++) {
        //     let item = contacts[i]

        //     //
        //     let genderText = this.getGenderText(item.genderId);

        //     //
        //     arr.push("<tr>");
        //     arr.push("<td>" + item.id + "</td>");
        //     arr.push("<td>" + item.firstName + "</td>");
        //     arr.push("<td>" + item.lastName + "</td>");
        //     arr.push("<td>" + item.phone + "</td>");
        //     arr.push("<td>" + item.address + "</td>");
        //     arr.push("<td>" + genderText + "</td>");
        //     arr.push("<td><button type='button' class='btn btn-danger x-delete' data-id='" + item.id + "' >Remove</button></td>");
        //     arr.push("<td><button type='button' class='btn btn-primary x-edit' data-id='" + item.id + "' >Edit</button></td>");
        //     arr.push("</tr>");

        // }

        // arr.push("</table>");
        // arr.push("</div>");

        // console.log(arr.length)

        // outputEl.innerHTML = arr.join("");
        // outputEl.innerHTML =arr.join("");

        // //
        // let el = document.createElement("div")
        // el.style.color = "red";
        // el.innerText = "Hello World!"

        // //
        // let el = $("<div>")
        //     .css("color", "red")
        //     .text("Hello World 222")
        //     .get(0)

        // let template = arr.join("");
        // let el20 = $(template).get(0)

        // let btnDelEls = $(el20).find(".x-delete").get()
        // btnDelEls.forEach((btnDelEl) => {
        //     let id = btnDelEl.getAttribute("data-id")
        //     btnDelEl.onclick = () => {
        //         contactFuncs.deleteContact(id);
        //     }
        // })

        // let btnEditEls = $(el20).find(".x-edit").get()
        // btnEditEls.forEach((btnEditEl) => {
        //     let id = btnEditEl.getAttribute("data-id")
        //     btnEditEl.onclick = () => {
        //         contactFuncs.openEditModal(id);
        //     }
        // })

        // outputEl.innerHTML = ""
        // outputEl.append(el20)
    }

    getGenderText(genderId: string) {
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


    openEditModal(itemId: string) {

        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contacts: Contact[]) => {

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

                $(document).find(".modal-title").text("Edit Contact")

                //
                showModal();

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

        $(document).find(".modal-title").text("New Contact")

        //show modal
        showModal();
    }

    refreshContacts(): void {
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contactsOnServer: Contact[]) => {
                this.renderOutput(contactsOnServer);
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });
    }

    // Add a new contact
    addContact(newContact: Contact): void {

        let reqData = {
            action: "save",
            contact: newContact,
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

    editContact(editedContact: Contact): void {
        
        let reqData = {
            action: "edit",
            contact: editedContact,
        }

        $.ajax({
            url: "http://127.0.0.1:5300/api/contact", // include ID in URL
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData), // send updated object
            success: () => {
                this.refreshContacts()
            },
            error: (xhr, status, error) => {
                console.error("Error updating contact:", error);
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

var contactFuncs = new ContactFuncs_Cls();

$(() => {

    let btnSaveEl = $(document).find(".x-main-save").get(0)
    btnSaveEl.onclick = () => {
        contactFuncs.saveEntry()
    }

    contactFuncs.refreshContacts();
})

