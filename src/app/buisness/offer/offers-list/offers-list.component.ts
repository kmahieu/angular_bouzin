import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  writeBlacklisted: boolean = false;

  blacklistedOffers: number = 0;

  offers: Offer[] = [];

  constructor(
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    // ici on implémente dans le ngOnInit qui permet au lancement du component
    // d'appeler la méthode getObservableOffers de notre offerService et l'on vient peuplé la liste d'offre notre observableOffer
    console.log("ngOnInit");
    this.offerService.getObservableOffers().subscribe(observableOffer => {
      this.offers = observableOffer;
    },
    errormessage => console.log(errormessage));

    this.offerService.getBlackLidtOffer().subscribe(count => this.blacklistedOffers = count)
  }

  // Ici on vient tester les différentes cycle de vie de nos components

  ngOnChanges(){
    console.log("ngOnchances");
  }

  ngOnDestroy(){
    console.log("ngOnDestroy");
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked(){
    console.log("ngAfterContentChecked");
  }

  ngAfterContentChanged(){
    console.log("ngAfterContentChanged");
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked(){
    console.log("ngAfterViewChecked");
  }

  ngAfterViewChanged(){
    console.log("ngAfterViewChanged");
  }



}
