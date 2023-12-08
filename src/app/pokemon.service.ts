import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ResponsePokemonService } from './models/all-models';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  optionsUsed= {headers: {"X-Api-Key": environment.POKEMONTCG_API_KEY}};
  constructor(private httpService: HttpClient) { }

  getAll(page:number){
    page++;
    return this.httpService.get(`${environment.API_POKEMONTCG}/cards?select=id,name,images,rarity,types,subtypes&page=${page})`, this.optionsUsed).pipe(map(x=> x as ResponsePokemonService))
  }

  searchName(name:string){
    return this.httpService.get(`${environment.API_POKEMONTCG}/cards?q=name:${name}`, this.optionsUsed).pipe(map(x=> x as ResponsePokemonService))
  }

  getDetails(id: number){
    return this.httpService.get(`${environment.API_POKEMONTCG}/cards/${id}`)
  }
}
