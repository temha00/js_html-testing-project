console.log("hello");

function myFunc(){
    let el1 = document.getElementById("input1");
    let el2 = document.getElementById("input2");
    let el3 = document.getElementById("input3");
    let el4 = document.getElementById("input4");
    console.log(el1.value);
    console.log(el2.checked);
    console.log(el3.value);

    let el4val = getSelectVal(el4)
    console.log(el4val)

}

function getSelectVal(el4){
    let x = el4.length;
    const myArray[] = el4;
    for (let i = 0; i < x; i++){
        if myArray[i] = "true"; 
    }

    return ""

}


function myOutput(){
}
