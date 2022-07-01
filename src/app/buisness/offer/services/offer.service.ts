/* It's a service that manages the offers */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, map, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import Dao from 'src/app/dao/dao';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
// ici on vient extends le offerService avec la class DAO que nous typons en Offer pour l'offerService
// afin de pouvoir utilisé les méthodes et proprité de la classe
export class OfferService extends Dao<Offer>{

  selectedOffer?: Offer;

  offers: Offer[] = [];

// on instancie notre BehaviorSubject que l'on type en liste d'offre et que l'on vient peuplé de la liste d'offre plus haut
  private observableOffers = new BehaviorSubject<Offer[]>(this.offers);

  constructor(
    // on injecte la dépendance de l'APIservice afin de pouvoir récupérer ses propriétés et méthodes
    private apiService: ApiService,
  ) {
    super();
    console.log('OfferService created');
  }

  // on vient faire une méthode asynchrone qui demande comme type de retour une promesse
  async setObversableOffers(): Promise<void>
  {
    // on vient appeler la méthode getData de l'APIService qui permet de recuperer les data
    await this.apiService.getData()
    .then(offers => {
    //  ici on vient ajoutéer les datas au localStorage grace a la méthode addData du DAO.
      this.addData(offers);
      // ici on vient mettre a jour observableOffers avec les données récupérer
      this.updateOffers(offers);
    })
    .catch(errormessage => {
      /* si il y a une erreur on utilise les donner du local storage
      et on update notre behavior subject */
      console.log(errormessage);
      const localOffer = localStorage.getItem('data');
      if (localOffer !== null) {
        this.updateOffers(JSON.parse(localOffer))
      }
     }
    );
  }
// ici on vient effectuer une méthode qui demande en retour une Observable typé en liste d'offre
  getObservableOffers(): Observable<Offer[]> {
    this.setObversableOffers()
    // on retour notre observableOffer en observable.
    return this.observableOffers.asObservable();
  }

  // On vient effectuer une méthode pour récupérer une offre en fonction de son Id qui demande
  // en retour une Observable typé en Offre
  getObservableOffer(id: string): Observable<Offer | undefined> {
    return this.observableOffers.asObservable()
    // on vient faire un filtre afin de recuperer l'offre en question par son ID
      .pipe(
        map(offers => offers.find(offer => offer.id === id))
      );
  }

  // on vient recuperer notre observableOffer avec comme type de retour Subject typé en en listre d'offre
  getSubjectOffer(): Subject<Offer[]> {
    return this.observableOffers;
  }

  // ici on vient recuperer peuplé effectué une méthode afin de peuplé le observableOffer
  addOffer(offer: Offer): void {
    this.observableOffers.getValue().push(offer);
    this.getSubjectOffer().next(this.observableOffers.getValue());
  }
  
  updateOffers(offers: Offer[]): void {
    this.updateData(offers);
    this.getSubjectOffer().next(offers);
  }

  selecteOffer(offer: Offer): void {
    this.selectedOffer = offer;
  }

  blacklistedUnBlacklisteOffer(offer: Offer): void {
    this.observableOffers.getValue().find(o => {
      if (o.id === offer.id) {
        o.isBlacklisted = !o.isBlacklisted;
        console.log(o)
      }
      this.observableOffers.next(this.observableOffers.getValue());
    })}

  favoriteUnFavoriteOffer(offer: Offer): void {
      this.observableOffers.getValue().find(o => {
        if (offer.id === o.id) {
          o.isFavorite = !o.isFavorite;
          console.log(o)
        }
        this.observableOffers.next(this.observableOffers.getValue());
    })
  }

  applyOffer(offer: Offer): void {
    this.observableOffers.getValue().find(o => {
      if (offer.id === o.id) {
        o.isApply = !o.isApply;
        console.log(o)
      }
      this.observableOffers.next(this.observableOffers.getValue());
  })
  }

  openOffer(offer: Offer): void {
    this.observableOffers.getValue().find(o => {
      if (offer.id === o.id) {
        o.isOpen = !o.isOpen;
        console.log(o)
      }
      this.observableOffers.next(this.observableOffers.getValue());
    })}

  getBlackLidtOffer(): Observable<number> {
    return this.observableOffers.asObservable()
      .pipe(
        map(offers => offers.filter(o => o.isBlacklisted)),
        map(offers => offers.length)
    );
  }

}
