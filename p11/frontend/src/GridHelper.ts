namespace GridHelper {


    interface Col {
        title?: string,
        fldName?: string;
    }

    // type interfaceTypes = 'Contact' | 'Company';

    export class MainClass {

        private _data: any[]
        private cols: Col[] = [];

        public SetData(data: any[]) {
            this._data = data

        }
        public AddColumn(title: string, fldName: string) {
            let col: Col = {
                title: title,
                fldName: fldName
            }
            this.cols.push(col);
            return this.cols;
        }

        public renderTable() {

            let tableEl = $("<table class='table table-bordered table-striped table-hover'>").get(0) as HTMLTableElement;
            let trEl = $("<tr>").get(0) as HTMLTableRowElement;
            tableEl.appendChild(trEl);
            this.cols.forEach((item) => {
                $("<th>").text(item.title).appendTo(trEl)
            });

            this._data.forEach((item) => {
                let trEl = $("<tr>").get(0) as HTMLTableRowElement;

                console.log(item)

                this.cols.forEach((c) => {
                    console.log(item[c.fldName]);
                    let value = item[c.fldName];
                    let elTableRowData = $("<td>").text(value).get(0) as HTMLTableCellElement;
                    trEl.appendChild(elTableRowData);
                });

                tableEl.appendChild(trEl);
            });

            return tableEl;

        }
    }
}