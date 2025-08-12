console.log("hello");

function myFunc(){
    let el1 = document.getElementById("input1");
    let el2 = document.getElementById("input2");
    let el3 = document.getElementById("input3");
    let el4 = document.getElementById("input4");
    console.log(el1.value);
    console.log(el2.checked);
    console.log(el3.value);

    let el4val = getSelectVal(el4);
    console.log(el4val);

    let el1val = el1.value;
    let el2val = el2.checked;

    if(el2val == true){
        el2val = "checked";
    } else {
        el2val = "unchecked";
    }

    let el3val = el3.value;

    let values = setValues(el1val, el2val, el3val, el4val);
    console.log(values)
}

function getSelectVal(el4){
    for(let i = 0; i < el4.length; i++){
        if(el4.options[i].selected == true){
            el4 = el4.options[i].value;
        }
    }
    return el4;
}

const storedValues = [];

function setValues(el1val, el2val, el3val, el4val){
    const valuesArray = [el1val, el2val, el3val, el4val];
    for(let i = 0; i < valuesArray.length; i++){
        storedValues[i] = valuesArray[i];
    }

    console.log(storedValues);

    return valuesArray;
}

function myOutput(){
    document.getElementById("GetVal").innerHTML = 
    "Textbox : " + storedValues[0] + "<br>" +
    "Checkbox : " + storedValues[1] + "<br>" +
    "Textarea : " + storedValues[2] + "<br>" +
    "Select : " + storedValues[3];

}