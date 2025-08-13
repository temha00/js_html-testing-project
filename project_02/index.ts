console.log("hello");

interface Contact {
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    genderId?: string;
}

let contact: Contact[] = [];

function myFunc() {
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4 = document.getElementById("input4") as HTMLInputElement;
    let el5 = document.getElementById("input5") as HTMLSelectElement;
    let genderId = getGenderId(el5);

    setValues({
        firstName: el1.value, 
        lastName: el2.value, 
        address: el3.value, 
        phone: el4.value, 
        genderId: genderId
    });
    console.log(setValues);

    myOutput();
    console.log(myOutput);
}

function getGenderId(el5: HTMLSelectElement): string {

    let retval = "";

    for (let i = 0; i < el5.options.length; i++) {

        if (el5.options[i].selected == true) {
            retval = el5.options[i].value
        }

    }

    return retval

}

function setValues(newEntry: Contact) {

    contact.push(newEntry);

}

function myOutput() {
    let output = document.getElementById("output") as HTMLDivElement as Contact;
    for (let i = 0; contact.length; i++) {
        output = contact[i];
    }
}

// function setValues(el1val: string, el2val: string, el3val: string, el4val: string) {
//     const valuesArray = [el1val, el2val, el3val, el4val];
//     for (let i = 0; i < valuesArray.length; i++) {
//         storedValues[i] = valuesArray[i];
//     }

//     console.log(storedValues);

//     return valuesArray;
// }

// function myOutput() {
//     let el3 = document.getElementById("output") as HTMLDivElement;
//     el3.innerHTML =
//         "Textbox : " + storedValues[0] + "<br>" +
//         "Checkbox : " + storedValues[1] + "<br>" +
//         "Textarea : " + storedValues[2] + "<br>" +
//         "Select : " + storedValues[3];

// }