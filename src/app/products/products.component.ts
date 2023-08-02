import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'brand', 'title', 'category', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'thumbnail', 'action'];

  // all variables are declared here
  singleProduct: any;
  productsList = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private productServ: ProductService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  // Fn to get product list
  getProductDetails() {
    this.productServ.getProductDetails().subscribe((res) => {
      if (res && res.products && res.products.length > 1) {
        this.dataSource = new MatTableDataSource(res.products);
        // this.productsList = res.products;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // Fn to get a single product
  getSingleProduct(ele: number) {
    this.productServ.getSingleProduct(ele).subscribe((res) => {
      this.singleProduct = res;
        console.log(this.singleProduct);
    })
  }

  // Fn to apply filter when user enters value into search input field
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Fn to show call an API to get single product when click on view action button
  showProduct(productId: number) {
    this.getSingleProduct(productId);
  }
}
