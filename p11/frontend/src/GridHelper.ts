namespace GridHelper {

    interface Col<T> {
        title?: string,
        fldName?: Extract<keyof T, string>,
        funcEl?: (item: T) => HTMLElement,
        funcString?: (item: T) => string;
    }

    export class MainClass<T> {

        private _data: T[]
        private cols: Col<T>[] = [];

        public SetData(data: T[]) {
            this._data = data

        }
        public AddColumn(col: Col<T>) {
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

                this.cols.forEach((col) => {
                    let elTableRowData = $("<td>").get(0) as HTMLTableCellElement;

                    if (col.funcEl) {
                        let el = col.funcEl(item);
                        el.innerText = col.title;
                        elTableRowData.append(el);
                    } else if (col.funcString) {
                        elTableRowData.innerText = col.funcString(item);
                    } else if (col.fldName) {
                        let value = (item as any)[col.fldName];
                        elTableRowData.innerText = value;
                    } else {
                        elTableRowData.innerText = '$error$';
                    }

                    trEl.appendChild(elTableRowData);
                });

                tableEl.appendChild(trEl);
            });

            return tableEl;

        }
    }
}