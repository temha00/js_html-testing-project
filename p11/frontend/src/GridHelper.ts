// namespace GridHelper {
//     interface Col{
//         title?: string,
//         fldName?: string;
//     }

//     let cols: Col[] = [];

//     class MainClass {

//         AddColumn(title: string, fldName: string) {
//             cols.push();
//             return cols;
//         }

//         renderTable() {
//             let elTable = $("<table class='table table-bordered table-striped table-hover'>").get(0)
//             let elTableHeader = $("<th>").get(0) as HTMLTableColElement;
//             elTable.appendChild(elTableHeader);
//             cols.forEach((title) => {
//                 elTableHeader.appendChild($("<th>").get(0));
//                 elTableHeader.innerText = title;
//             });
//         }
//     }

// }