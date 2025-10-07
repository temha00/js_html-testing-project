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

        let contact: Contact = {
            id: idEl.value,
            firstName: el1.value,
            lastName: el2.value,
            phone: el3.value,
            address: el4.value,
            genderId: el5val
        };

        this.add_or_edit_Contact(contact);

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
    render_Contacts_Output(contacts: Contact[]) {

        let outputEl = document.getElementById("output") as HTMLDivElement;
        outputEl.innerHTML = "";

        cmmHelper.AddPageTitle(outputEl, "Contact Page")

        let pageContentEl = $(`<div class="page-content">`).appendTo(outputEl)[0] as HTMLLabelElement

        let btnReturn = $(`<button type="button" class="btn x-small btn-secondary">`).text("Back").appendTo(pageContentEl)[0] as HTMLButtonElement
        btnReturn.onclick = () => {
            page = 'main';
            refreshPage();
        }

        let btnContactRefresh = $(`<button type="button" class="btn x-small btn-primary">`).text("Refresh").appendTo(pageContentEl)[0] as HTMLButtonElement
        btnContactRefresh.onclick = () => {
            this.refreshContacts();
        }

        let btnContactAddNew = $(`<button type="button" class="btn x-small btn-primary">`).text("Add New Entry").appendTo(pageContentEl)[0] as HTMLButtonElement
        btnContactAddNew.onclick = () => {
            this.openNewEntryModal();
        }

        let outerEl = $("<div class='x-outer'>").text("contacts count = " + contacts.length)[0]
        pageContentEl.appendChild(outerEl);

        let gridHelper = new GridHelper.MainClass<Contact>();
        gridHelper.SetData(contacts)
        gridHelper.AddColumn({ title: "Id", fldName: "id" });
        gridHelper.AddColumn({ title: "First Name", fldName: "firstName" });
        gridHelper.AddColumn({ title: "Last Name", fldName: "lastName" });
        gridHelper.AddColumn({ title: "Phone Number", fldName: "phone" });
        gridHelper.AddColumn({ title: "Address", fldName: "address" });
        gridHelper.AddColumn({
            title: "Gender", funcString: (item) => {
                let GenderText = this.getContactGenderText(item.genderId);
                return GenderText;
            }
        });
        gridHelper.AddColumn({
            title: "Edit", funcEl: (item) => {
                let el = $("<button type='button' class='btn btn-primary x-edit'>").get(0);
                el.onclick = () => {
                    this.openContactEdit(item.id);
                }
                return el;
            }
        });
        gridHelper.AddColumn({
            title: "Remove", funcEl: (item) => {
                let el = $("<button type='button' class='btn btn-danger x-delete'>").get(0);
                el.onclick = () => {
                    this.deleteContact(item.id);
                }
                return el;
            }
        });

        let elTable = gridHelper.renderTable();
        outerEl.appendChild(elTable);
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

    openContactEdit(itemId: string) {

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

                $(document).find(".modal-title").text("Edit Contact");

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

        $(document).find(".modal-title").text("New Contact");

        //show modal
        showModal();
    }

    refreshContacts(): void {
        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contactsOnServer: Contact[]) => {
                this.render_Contacts_Output(contactsOnServer);
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });
    }

    // Add a new contact or edit an existing contact
    add_or_edit_Contact(contact_add_or_edit: Contact): void {

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