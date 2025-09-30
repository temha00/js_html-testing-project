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
        ($('#myModal2') as any).modal('hide');

        //
        toastr.success("Company is saved.");

    }

    //the function that renders the output
    render_Companies_Output(companies: Company[]) {

        let outputEl = document.getElementById("container") as HTMLDivElement;

        if (outputEl != null) {
            outputEl.innerHTML = "";
        }

        let btnReturn = $(`<button type="button" class="btn x-small btn-secondary">Return</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnReturn.onclick = () => {
            page = 'main';
            refreshPage();
        }

        let btnCompanyRefresh = $(`<button type="button" class="btn x-small btn-primary">Refresh</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnCompanyRefresh.onclick = () => {
            this.refreshCompanies();
        }

        let btnCompanyAddNew = $(`<button type="button" class="btn x-small btn-primary" onclick="contactFuncs.openNewEntryModal()">Add New Entry</button>`).appendTo(outputEl)[0] as HTMLButtonElement
        btnCompanyAddNew.onclick = () => {
            this.openNewCompanyEntry();
        }

        let outerEl = $("<div class='x-outer'>").text("companies count = " + companies.length)[0]
        outputEl.appendChild(outerEl);

        let elTable = $("<table class='table table-bordered table-striped table-hover'>").get(0)
        outerEl.appendChild(elTable);

        let elTableHeaderRow = $("<tr>").get(0);
        elTable.appendChild(elTableHeaderRow);

        elTableHeaderRow.appendChild($("<th>Company Id</th>").get(0));
        elTableHeaderRow.appendChild($("<th>Company Name</th>").get(0));
        elTableHeaderRow.appendChild($("<th colspan='2'>Remove/Edit Entry</th>").get(0));

        for (let i = 0; i < companies.length; i++) {

            let item = companies[i];

            let elTableDataRow = $("<tr>").get(0);
            elTable.appendChild(elTableDataRow);

            elTableDataRow.appendChild($("<td>" + item.id + "</td>").get(0));
            elTableDataRow.appendChild($("<td>" + item.companyName + "</td>").get(0));

            let elButtonDelete = $("<td><button type='button' class='btn btn-danger x-delete'>Remove</td>").get(0);
            elButtonDelete.onclick = () => {
                this.deleteCompany(item.id);
            }
            elTableDataRow.appendChild(elButtonDelete);


            let elButtonEdit = $("<td><button type='button' class='btn btn-primary x-edit'>Edit</td>").get(0);
            elButtonEdit.onclick = () => {
                this.openCompanyEdit(item.id);
            }
            elTableDataRow.appendChild(elButtonEdit);

        }

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
                el1.value = company.firstName;


                $(document).find(".modal-title").text("Edit Company");

                //
                ($('#myModal2') as any).modal('show');
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
        ($('#myModal2') as any).modal('show');
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
