import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../model/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private httpClient: HttpClient) { }


    findAllProduit(): Observable<Produit[]> {
      return this.httpClient.get<Produit[]>(`http://localhost:8081/jobs/findAll`);
    }

    addNewProduit(produitModel: Produit){
      return this.httpClient.post(`http://localhost:8081/jobs/addNew` , produitModel, {responseType:'text'});
    }

    updateProduit(produitModel: Produit){
      return this.httpClient.put(`http://localhost:8081/jobs/update` , produitModel, {responseType:'text'});
    }

    deleteProduit(produitModel: Produit){
      return this.httpClient.post(`http://localhost:8081/jobs/delete` , produitModel, {responseType:'text'});
    }
}
