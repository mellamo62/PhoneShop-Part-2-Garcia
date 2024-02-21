import {Component} from '@angular/core';
import {CartService} from "../cart.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CurrencyPipe, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent {

    items = this.cartService.getItems();
    itemsBuyed: string[] = [];
    itemsBuyedString!: string;
    cont = 0;

    checkOutForm = this.formBuilder.group({
        name: '',
        address: ''
    })

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder
    ) {
        this.itemsBuyed = [];
    }

    onSubmit() {

        for (let item of this.items) {
            this.cont++;
            this.itemsBuyed.push(item.id.toString(), item.name, item.description, item.price.toString(), item.provider.id.toString(), item.provider.name);
            this.itemsBuyedString = this.itemsBuyed.join(",");
            localStorage.setItem(`${item.id}`, this.itemsBuyedString);
        }
        this.items = this.cartService.clearCart();
        console.warn('You order has been submitted', this.checkOutForm.value);

        this.checkOutForm.reset();
    }

}
