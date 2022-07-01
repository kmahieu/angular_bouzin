import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { TokensService } from '../auth/services/tokens.service';
import { Offer } from '../buisness/offer/models/offer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?range=0-5'

  constructor(
    // on vient injecté les services que l'on a besoin
    private httpClient: HttpClient,
    private tokensService: TokensService,
  ) { }

  // on implémente une méthode async qui aura comme type de retour une promesse de type liste d'offre
  async getData(): Promise<Offer[]>
  {
    // Ici on convertis une observable en promise
    const token = await firstValueFrom(this.tokensService.getToken());

    // On vient faire une requette http de la liste d'offre sur l'API de popole Emploie
    return firstValueFrom(this.httpClient.get<Offer[]>(this.API_URL, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    })
      .pipe(
        map((data: any) => {
          // ici on vient initialisé une liste qui sera une listre d'offre
          let list = [] as Offer[];
          // on vient bouclé peuplé notre list de nos datas
          data.resultats.forEach((o: any) => {
            list.push({
              id: o.id,
              designation: o.intitule,
              description: o.description,
              contract: o.typeContrat,
              salary: o.salaire.libelle,
              isApply: false,
              isFavorite: false,
              isBlacklisted: false,
              isOpen: false,
            } as Offer)
          })
          return list;
        })
      ));
  }
}
