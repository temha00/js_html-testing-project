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


//main function for adding and displaying an entry
function saveEntry() {
    let idEl = document.getElementById("idField") as HTMLInputElement;
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4 = document.getElementById("input4") as HTMLInputElement;
    let el5 = document.getElementById("input5") as HTMLSelectElement;
    let el5val = getSelectVal(el5);

    let contact: Contact = {
        id: idEl.value,
        firstName: el1.value,
        lastName: el2.value,
        phone: el3.value,
        address: el4.value,
        genderId: el5val
    };

    if (idEl.value == "0") {
        addContact(contact);
    } else {
        editContact(contact);
    }

    //
    hideModal();

    //
    toastr.success("Contact is saved.");

}

//get the value that is given to the option on the html
function getSelectVal(el5: HTMLSelectElement): string {

    let retval = "";

    for (let i = 0; i < el5.options.length; i++) {

        if (el5.options[i].selected == true) {
            retval = el5.options[i].value
        }

    }

    return retval;

}


//the function that renders the output
function renderOutput(contacts: Contact[]) {

    let outputEl = document.getElementById("output") as HTMLDivElement;
    let arr: string[] = []

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

    for (let i = 0; i < contacts.length; i++) {
        let item = contacts[i]

        //
        let genderText = getGenderText(item.genderId);

        //
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

    console.log(arr)

    outputEl!.innerHTML = arr.join("");
}

function getGenderText(genderId: string) {
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

//
// function removeEntry(itemId: string) {

//     // let arr: Contact[] = [];

//     // for (let i = 0; i < contacts.length; i++) {
//     //     if (contacts[i].id != itemId) {
//     //         arr.push(contacts[i]);
//     //     }
//     // }

//     // contacts = arr;

//     deleteContact(itemId);
// }



//
function resetEntries() {
    // localContacts = [];

    // //is this correct?
    // counter = 0;

    // let idFieldResetEntries = document.getElementById("idField") as HTMLInputElement;
    // idFieldResetEntries.value = "0";

    // //
    // renderOutput();

}


function openEditModal(itemId: string) {

    $.ajax({
        url: "http://127.0.0.1:5300/api/contact",
        method: "GET",
        dataType: null,
        success: (contacts: Contact[]) => {

            let contact = contacts.filter(x=>x.id ==itemId)[0];
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

function openNewEntryModal() {
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

function refreshContacts(): void {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact",
        method: "GET",
        dataType: null,
        success: (contactsOnServer: Contact[]) => {
            renderOutput(contactsOnServer);
        },
        error: (xhr, status, error) => {
            console.error("Error fetching contacts:", error);
        }
    });
}

// Add a new contact
function addContact(newContact: Contact): void {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact",
        method: "POST",
        contentType: "application/json", // important
        data: JSON.stringify(newContact),
        success: () => {
            refreshContacts()
        },
        error: (xhr, status, error) => {
            console.error("Error posting contact:", error);
        }
    });
}

function editContact(editedContact: Contact): void {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact/" + editedContact.id, // include ID in URL
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(editedContact), // send updated object
        success: () => {
            refreshContacts()
        },
        error: (xhr, status, error) => {
            console.error("Error updating contact:", error);
        }
    });
}

function deleteContact(contactId: string): void {
    $.ajax({
        url: "http://127.0.0.1:5300/api/contact/" + contactId,
        method: "DELETE",
        success: () => {
            refreshContacts()
        },
        error: (xhr, status, error) => {
            console.error("Error delete contact:", error);
        }
    });
}

$(function () {
    refreshContacts();
})