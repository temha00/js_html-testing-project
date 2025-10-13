console.log("hello");

//for creating contact array and objects
interface Contact {
    id?: number;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    genderId?: string;
}

//
let contacts: Contact[] = [];
let counter = 0;

//main function for adding and displaying an entry
function saveEntry() {
    let idEl = document.getElementById("idField") as HTMLInputElement;
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4 = document.getElementById("input4") as HTMLInputElement;
    let el5 = document.getElementById("input5") as HTMLSelectElement;
    let el5val = getSelectVal(el5);

    let id = idEl.valueAsNumber;
    let isNewRec = (id == 0)

    if (isNewRec) {

        counter++;
        let contact: Contact = {
            id: counter,
            firstName: el1.value,
            lastName: el2.value,
            address: el3.value,
            phone: el4.value,
            genderId: el5val
        };

        contacts.push(contact);
    } else {
        let contact = getContactObj(id)
        contact.firstName = el1.value;
        contact.lastName = el2.value;
        contact.address = el3.value;
        contact.phone = el4.value;
        contact.genderId = el5.value;
    }



    //
    hideModal();

    //
    toastr.success("Contact is saved.");

    //
    renderOutput();
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
function renderOutput() {

    let outputEl = document.getElementById("output") as HTMLDivElement;
    let arr: string[] = []

    arr.push("contacts count = " + contacts.length + "<br>");

    for (let i = 0; i < contacts.length; i++) {
        let item = contacts[i]

        //
        let genderText = getGenderText(item.genderId);

        //
        arr.push(
            "Id : " + item.id + "<br>" +
            "Name : " + item.firstName + "<br>" +
            "Surname : " + item.lastName + "<br>" +
            "Address : " + item.address + "<br>" +
            "Phone : " + item.phone + "<br>" +
            "Gender : " + genderText + "<br>" +
            "<button type='button' onclick='removeEntry(" + item.id + ")' >Remove</button>" +
            "<button type='button' onclick='openEditModal(" + item.id + ")' >Edit</button>" +
            "<br>"
        );

    }

    console.log(arr)

    outputEl.innerHTML = arr.join("");

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
function removeEntry(itemId: number) {

    let arr: Contact[] = [];

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id != itemId) {
            arr.push(contacts[i]);
        }
    }

    contacts = arr;

    //
    renderOutput();
}

//
function resetEntries() {
    contacts = [];

    //is this correct?
    counter = 0;

    let idFieldResetEntries = document.getElementById("idField") as HTMLInputElement;
    idFieldResetEntries.value = "0";

    //
    renderOutput();

}

function getContactObj(itemId: number) {
    for (let i = 0; i < contacts.length; i++) {
        if (itemId == contacts[i].id) {
            return contacts[i];
        }
    }
}

function openEditModal(itemId: number) {
    let contact = getContactObj(itemId);
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
    el3.value = contact.address;
    el4.value = contact.phone;
    el5.value = contact.genderId;

    //
    showModal();
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

    //show modal
    showModal();
}
