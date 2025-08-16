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
function addEntry() {
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4 = document.getElementById("input4") as HTMLInputElement;
    let el5 = document.getElementById("input5") as HTMLSelectElement;
    let el5val = getSelectVal(el5);

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
        let genderText = "";
        if (item.genderId == "1") {
            genderText = "male"
        } else {
            genderText = "female"
        }

        //
        arr.push(
            "Id : " + item.id + "<br>" +
            "Name : " + item.firstName + "<br>" +
            "Surname : " + item.lastName + "<br>" +
            "Address : " + item.address + "<br>" +
            "Phone : " + item.phone + "<br>" +
            "Gender : " + genderText + "<br>" +
            "<button type='button' onclick='removeEntry(" + item.id + ")' >Remove</button>" +
            "<br>"
        );

    }

    console.log(arr)

    outputEl.innerHTML = arr.join("");

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

    //
    renderOutput();

}

// contacts.splice(contacts[i].id - 1);
// let outputEl = document.getElementById("output") as HTMLDivElement;
// if (outputEl.hasChildNodes()) {
//     outputEl.removeChild(outputEl.children[contacts[i].id - 1])
// }