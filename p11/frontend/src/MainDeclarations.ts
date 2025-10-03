//for creating contact array and objects
interface Contact {
    id?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    genderId?: string;
}

interface Company {
    id?: string;
    companyName?: string;
}

type PageTypes = 'main' | 'contact' | 'company' | '';
let page: PageTypes = 'main';

//toastr operations
declare var toastr: any;

//
toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-bottom-right",
    timeOut: 2000,
};


//show modal form
function showModal() {
    let obj = $('#myModal') as any;
    obj.modal("show");
}

//show modal form
function showModal2() {
    let obj = $('#myModal2') as any;
    obj.modal("show");
}

//hide modal form
function hideModal() {
    let obj = $('#myModal') as any;
    obj.modal("hide");
}

//hide modal form
function hideModal2() {
    let obj = $('#myModal2') as any;
    obj.modal("hide");
}
