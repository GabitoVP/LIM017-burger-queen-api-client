import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {

  productsBreakfast: Product[] = [];

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productsService.getProductsMethod()
    .subscribe({
      next: (res: Product[]) => {
        console.log('productoooooossssssssssssss',res)

        this.productsBreakfast = res.filter(e => e.type === "Desayuno")
        console.log('unPorductooooooooooo',this.productsBreakfast)
      },
      error: (err) => {
        console.log(err, 'error mientras se hacia la consulta de data');
      }
    })
  }

}
