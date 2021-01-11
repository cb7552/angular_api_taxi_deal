import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;

  constructor() { }
  //   columnDefs = [
  //     {headerName: 'Make', field: 'make'},
  //     {headerName: 'Model', field: 'model'},
  //     {headerName: 'Price', field: 'price'},
  //     {headerName: 'Vechile Image', field: 'image' ,  cellTemplate:"<img width=\"50px\" src=\"{{images}}\" >"}
  // ];

  // rowData = [
  //     {make: 'Toyota', model: 'Celica', price: 35000 , image: "car-green.png" },
  //     {make: 'Ford', model: 'Mondeo', price: 32000},
  //     {make: 'Porsche', model: 'Boxter', price: 72000}
  // ];


  columnDefs = [
    {
      headerName: 'Action', field: 'edit', cellStyle: { 'cursor': 'pointer', 'text-align': 'left' },
      cellRenderer: (params) => {
        var editButton = document.createElement('i');
        editButton.setAttribute("class", "image-icon permission-icon-Edit fa fa-edit");
        editButton.setAttribute("title", "Edit Detail");
        return editButton;
      },
    },

    { headerName: 'Name', field: 'name' },

    {
      headerName: 'Vechile Image', field: 'vechile',
      cellRenderer: (params) => {
        var element = document.createElement("span");
        var imageElement = document.createElement("img");
        imageElement.setAttribute("class", "img-profile");
        if (params.value != "" && params.value != null) {
          imageElement.src = params.value;
        } else {
          imageElement.src = "assets/images/car.png";
        }
        element.appendChild(imageElement);
        return element;
      }
    },

    { headerName: 'Car Type', field: 'type' },
    { headerName: 'Taxi Number', field: 'taxino' },
    { headerName: 'License Number', field: 'licno' },
    { headerName: 'Phone Number', field: 'phno' },
    {headerName: 'Status', field: 'status'}
    // {
    //   headerName: 'Status', field: 'status',
    //   cellRenderer: (params) => {
    //     var text = '<h1>Action</h1>';
    //     var element = document.createElement("span").
    //     return element;
    //   }
    //   }
    
  ];

  rowData = [
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: 'Active' },
    { name: 'Rahul', type: "Taxi", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Deactive" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Deactive" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Deactive" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" },
    { name: 'Rahul', type: "Taxi 4", taxino: "TN 66 F 2321", licno: "4324GJSN82", phno: 9600535201, status: "Active" }
  ];

   

  

  ngOnInit() {
    console.log("Rahul");
  }

  //   public customCellRendererFunc(params): string {
  //     let cellContent: string = '';
  //     try {
  //             cellContent += '<image src="images\\' +
  //             params + '" title="' + params, '"></a> &nbsp;';
  //     } catch (exception) {
  //         console.error(exception);
  //     }

  //     return cellContent
  // }

  // public customCellRendererFunc(params): string {
  //   let cellContent: string = '';
  //   var element = document.createElement("span");
  //   var imageElement = document.createElement("img");
  //   imageElement.setAttribute("class", "img-profile");
  //   if (params != "" && params != null) {
  //       imageElement.src = params;
  //   } else {
  //       imageElement.src = "images/car-green.png";
  //   }
  //   element.appendChild(imageElement);
  //   return cellContent;
  // }
}

// for dynamic rendering of data

// rowData = [];

//   ngOnInit() {
//     fetch('https://api.myjson.com/bins/15psn9')
//       .then(result => result.json())
//       .then(rowData => this.rowData = rowData);
//   }


