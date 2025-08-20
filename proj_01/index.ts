console.log("hello");

function myFunc() {
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4_aa = document.getElementById("input4") as HTMLSelectElement;
    console.log(el1.value);
    console.log(el2.checked);
    console.log(el3.value);

    let el4val = getSelectVal(el4_aa);
    console.log(el4val);

    let el1val = el1.value;
    let el2valstr: string;

    if (el2.checked == true) {
        el2valstr = "checked";
    } else {
        el2valstr = "unchecked";
    }

    let el3val = el3.value;
    let values = setValues(el1val, el2valstr, el3val, el4val);
    console.log(values)
}

function getSelectVal(el4: HTMLSelectElement): string {

    let retval = ""

    for (let i = 0; i < el4.options.length; i++) {

        if (el4.options[i].selected == true) {
            retval = el4.options[i].value
        }

    }

    return retval

}

const storedValues: any[] = [];

function setValues(el1val: string, el2val: string, el3val: string, el4val: string) {
    const valuesArray = [el1val, el2val, el3val, el4val];
    for (let i = 0; i < valuesArray.length; i++) {
        storedValues[i] = valuesArray[i];
    }

    console.log(storedValues);

    return valuesArray;
}

function myOutput() {
    let el3 = document.getElementById("output") as HTMLDivElement;
    el3.innerHTML =
        "Textbox : " + storedValues[0] + "<br>" +
        "Checkbox : " + storedValues[1] + "<br>" +
        "Textarea : " + storedValues[2] + "<br>" +
        "Select : " + storedValues[3];

}