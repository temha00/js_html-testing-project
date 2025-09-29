// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import SubComp1 from './SubComp1';

function App() {
  // const [count, setCount] = useState(0)

  // console.log("here comes..")

  // let count2 = 0;

  // function increment() {
  //   count2++
  //   console.log(count2)
  // }

  interface Contact {
    id?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    genderId?: string;
  }

  function buttonFunc() {
    alert("this is a button");
  }

  function buttonShow() {
    let contact: Contact = {
      id: "1",
      firstName: "Ahmet",
      lastName: "Aktas",
      phone: "00404002233",
      address: "ahahdhadkadka",
      genderId: "1"
    };

    alert(contact.firstName);
    console.log(contact);
  }

  let contacts: Contact[] = [];

  function addEntry() {
    let el1 = document.getElementById("input1") as HTMLInputElement;
    let el2 = document.getElementById("input2") as HTMLInputElement;
    let el3 = document.getElementById("input3") as HTMLInputElement;
    let el4 = document.getElementById("input4") as HTMLInputElement;
    let el5 = document.getElementById("input5") as HTMLInputElement;
    let el6 = document.getElementById("input6") as HTMLSelectElement;
    let el6val = el6.value;

    let contact: Contact = {
      id: el1.value,
      firstName: el2.value,
      lastName: el3.value,
      phone: el4.value,
      address: el5.value,
      genderId: el6val
    }
    
    contacts.push(contact);

    renderOutput()
  }

  function renderOutput(){

    let arr: any[] = [];

    let outputEl = document.getElementById("output") as HTMLDivElement;

    contacts.forEach(element => {
      arr.push(
      element.id + "<br>",
      element.firstName + "<br>",
      element.lastName + "<br>",
      element.phone + "<br>",
      element.address + "<br>",
      element.genderId + "<br>",
    )
    });

    outputEl.innerHTML = arr.join("");

  }

  return (
    <>
      {/* <SubComp1></SubComp1>
    <SubComp1></SubComp1> */}

      <div>
        <button type='button' className='btn btn-test' onClick={() => { buttonFunc() }}></button>
      </div>
      <div>
        <button type='button' className='btn btn-test' onClick={() => { buttonShow() }}></button>
      </div>

      <div>
        <input type='text' id='input1'/>
        <input type='text' id='input2'/>
        <input type='text' id='input3'/>
        <input type='text' id='input4'/>
        <input type='text' id='input5'/>
        <select id='input6'>
          <option value={0}></option>
          <option value={1}>Male</option>
          <option value={2}>Female</option>
        </select>
      </div>

      <div>
        <button type='button' className='btn btn-test' onClick={() => {addEntry()}}></button>
      </div>

      <div id='output' className='output'>
        <label>Output</label>
      </div>

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => increment()}>
          count is {count2}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
