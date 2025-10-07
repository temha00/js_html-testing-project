class CompanyFuncs_Cls {
    saveCompanyEntry() {
        let idEl = document.getElementById("id_company") as HTMLInputElement;
        let el1 = document.getElementById("input_company_name") as HTMLInputElement;


        let company: Company = {
            id: idEl.value,
            companyName: el1.value,
        };

        this.add_or_edit_Company(company);

        //
        hideModal2();

        //
        toastr.success("Company is saved.");

    }

    //the function that renders the output
    render_Companies_Output(companies: Company[]) {

        let outputEl = document.getElementById("output") as HTMLDivElement;
        outputEl.innerHTML = "";

        cmmHelper.AddPageTitle(outputEl, "Company Page")

        let pageContentEl = $(`<div class="page-content">`).appendTo(outputEl)[0] as HTMLLabelElement

        let btnReturn = $(`<button type="button" class="btn x-small btn-secondary">`).text("Back>").appendTo(pageContentEl)[0] as HTMLButtonElement
        btnReturn.onclick = () => {
            page = 'main';
            refreshPage();
        }

        let btnCompanyRefresh = $(`<button type="button" class="btn x-small btn-primary">`).text("Refresh").appendTo(pageContentEl)[0] as HTMLButtonElement
        btnCompanyRefresh.onclick = () => {
            this.refreshCompanies();
        }

        let btnCompanyAddNew = $(`<button type="button" class="btn x-small btn-primary">`).text("Add New Entry").appendTo(pageContentEl)[0] as HTMLButtonElement
        btnCompanyAddNew.onclick = () => {
            this.openNewCompanyEntry();
        }

        let outerEl = $("<div class='x-outer'>").text("companies count = " + companies.length)[0]
        pageContentEl.appendChild(outerEl);

        let gridHelper = new GridHelper.MainClass<Company>();
        gridHelper.SetData(companies);

        gridHelper.AddColumn({ title: "Company Id", fldName: "id" });
        gridHelper.AddColumn({ title: "Company Name", fldName: "companyName" });
        gridHelper.AddColumn({
            title: "Edit", funcEl: (item): HTMLElement => {
                let el = $("<button type='button' class='btn btn-primary x-edit'>").get(0);
                el.onclick = () => {
                    this.openCompanyEdit(item.id);
                }
                return el;
            }
        });
        gridHelper.AddColumn({
            title: "Remove", funcEl: (item): HTMLElement => {
                let el = $("<button type='button' class='btn btn-danger x-delete'>").get(0);
                el.onclick = () => {
                    this.deleteCompany(item.id);
                }
                return el;
            }
        });

        let elTable = gridHelper.renderTable();
        outerEl.appendChild(elTable);
    }

    openCompanyEdit(itemId: string) {

        $.ajax({
            url: "http://127.0.0.1:5300/api/contact",
            method: "GET",
            dataType: null,
            success: (contacts: Company[]) => {

                let company = contacts.filter(x => x.id == itemId)[0];
                console.log(company)

                //
                let idEl = document.getElementById("id_company") as HTMLInputElement;
                let el1 = document.getElementById("input_company_name") as HTMLInputElement;

                idEl.value = "" + company.id;
                el1.value = company.companyName;


                $(document).find(".modal-title").text("Edit Company");

                //
                showModal2();
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });

    }

    openNewCompanyEntry() {
        let idEl = document.getElementById("id_company") as HTMLInputElement;
        let el1 = document.getElementById("input_company_name") as HTMLInputElement;

        idEl.value = "0";
        el1.value = "";

        $(document).find(".modal-title").text("New Company");

        //show modal
        showModal2();
    }

    refreshCompanies(): void {
        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "GET",
            dataType: null,
            success: (companiesOnServer: Company[]) => {
                this.render_Companies_Output(companiesOnServer);
            },
            error: (xhr, status, error) => {
                console.error("Error fetching contacts:", error);
            }
        });
    }

    // Add a new contact or edit an existing contact
    add_or_edit_Company(company_add_or_edit: Company): void {

        let reqData = {
            action: "save",
            company: company_add_or_edit,
        }


        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "POST",
            contentType: "application/json", // important
            data: JSON.stringify(reqData),
            success: () => {
                this.refreshCompanies()
            },
            error: (xhr, status, error) => {
                console.error("Error posting contact:", error);
            }
        });
    }

    deleteCompany(companyId: string): void {

        let reqData = {
            action: "delete",
            id: companyId
        }

        $.ajax({
            url: "http://127.0.0.1:5300/api/company",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqData),
            success: () => {
                this.refreshCompanies()
            },
            error: (xhr, status, error) => {
                console.error("Error delete contact:", error);
            }
        });
    }
}