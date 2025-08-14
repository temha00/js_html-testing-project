console.log("hello");

interface Contact{
    firstName?:string;
    lastName?:string;
    address?:string;
    phone?:string;
    gender?:string;
}

enum Gender{
    male = "1",
    female = "2"
}

console.log(Gender.male, Gender.female);

let storedValues: Contact[] = [];

function myFunc() {
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4 = document.getElementById("input4") as HTMLInputElement;
    let el5 = document.getElementById("input5") as HTMLSelectElement;
    console.log(el1.value);
    console.log(el2.value);
    console.log(el3.value);
    console.log(el4.value);

    let el5val = getSelectVal(el5);
    console.log(el5val);


    let valuesSent: Contact = {
        firstName: el1.value, 
        lastName: el2.value, 
        address: el3.value, 
        phone: el4.value, 
        gender: el5val
    };

    let values = setValues(valuesSent);
    console.log(values)

    myOutput();
}

function getSelectVal(el5: HTMLSelectElement): string {

    let retval = "";

    for (let i = 0; i < el5.options.length; i++) {

        if (el5.options[i].selected == true) {
            retval = el5.options[i].value
        }

    }

    return retval;

}

function setValues(valuesSent:any) {
    
    let valuesArray:any[] = [valuesSent];

    for (let i = 0; i < valuesArray.length; i++) {
        storedValues[i] = valuesArray[i];
    }

    console.log(storedValues);

    return valuesSent; 
}

function myOutput() {
    let divEl = document.getElementById("output") as HTMLDivElement;
    
    for(let i = 0; i < storedValues.length; i++){

        let genderOutput: string = storedValues[i].gender
        
        if(genderOutput == Gender.male){
            genderOutput = "male"
        } else {
            genderOutput = "female"
        }

        divEl.innerHTML =
        "Name : " + storedValues[i].firstName + "<br>" +
        "Surname : " + storedValues[i].lastName + "<br>" +
        "Address : " + storedValues[i].address + "<br>" +
        "Phone : " + storedValues[i].phone + "<br>" +
        "Gender : " + genderOutput;

    }
}