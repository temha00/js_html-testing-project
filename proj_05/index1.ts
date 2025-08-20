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

//hide modal form
function hideModal() {
    let obj = $('#myModal') as any;
    obj.modal("hide");
}