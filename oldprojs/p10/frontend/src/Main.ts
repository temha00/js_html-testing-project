console.log("main started...");

let cmmHelper = new CmmHelper();
let contactFuncs = new ContactFuncs_Cls();
let companyFuncs = new CompanyFuncs_Cls();

function refreshPage() {
    //pages
    if (page == 'main') {
        render_main_Output();
    } else if (page == 'contact') {
        contactFuncs.refreshContacts();
    } else if (page == 'company') {
        companyFuncs.refreshCompanies();
    }
}

function render_main_Output() {
    let outputEl = document.getElementById("output") as HTMLDivElement;
    outputEl.innerHTML = "";

    cmmHelper.AddPageTitle(outputEl, "Main Page")

    let pageContentEl = $(`<div class="page-content">`).appendTo(outputEl)[0] as HTMLLabelElement

    {
        let btn = $(`<button type="button" class="btn btn-primary">`).appendTo(pageContentEl)[0] as HTMLButtonElement
        btn.onclick = () => {
            page = 'contact'
            refreshPage();
        }
        btn.innerText = "Contacts"
    }

    {
        let btn = $(`<button type="button" class="btn btn-primary">`).appendTo(pageContentEl)[0] as HTMLButtonElement
        btn.onclick = () => {
            page = 'company'
            refreshPage();
        }
        btn.innerText = "Companies"
    }

    // {
    //     let btn = $(`<a href='/secondpage.html'> second page </a>`).appendTo(outputEl)[0] as HTMLButtonElement
    // }
    // {
    //     let btn = $(`<button type="button" class="btn btn-primary">`).appendTo(outputEl)[0] as HTMLButtonElement
    //     btn.onclick = () => {
    //         console.log("going to second page")
    //         window.location.href = "/secondpage.html"
    //     }
    //     btn.innerText = "Companies"
    // }


}

$(() => {

    let btnSaveEl_Contact = $(document).find(".x-contact-save").get(0)
    btnSaveEl_Contact.onclick = () => {
        contactFuncs.saveContactEntry()
    }


    let btnSaveEl_Company = $(document).find(".x-company-save").get(0)
    btnSaveEl_Company.onclick = () => {
        companyFuncs.saveCompanyEntry()
    }

    refreshPage();
})

