import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from './../product.service';

// export interface UserData {
//   position: string;
//   name: string;
//   weight: string;
//   symbol: string;
// }

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['brand', 'category', 'description', 'discountPercentage', 'id', 'price', 'rating', 'stock', 'thumbnail', 'title'];

  // variables
  products: any;
  singleProduct: any;

  constructor(private productServ: ProductService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.productServ.getProductDetails().subscribe((res) => {
      console.log(res && res.products && res.products.length > 1);
      if (res && res.products && res.products.length > 1) {
        this.dataSource = new MatTableDataSource(res.products)
      }
    })
  }

  getSingleProduct(ele: number) {
    this.productServ.getSingleProduct(ele).subscribe((res) => {
      this.singleProduct = res;
      // if (res?.length == 1) {
      // }
    })
  }
}
