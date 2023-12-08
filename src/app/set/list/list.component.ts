import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card, ResponsePokemonService, SetCard } from 'src/app/models/all-models';
import { PokemonDbService } from 'src/app/pokemon-db.service';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {

  pokes:Card[] = [];
  sets:SetCard[] = [];

  constructor(
    private service:PokemonService, 
    private db:PokemonDbService,
    private router: Router) {
    this.getAll();
    this.getSetsDb();
  }

  getAll(){
   this.service.getAll(0).subscribe((response:ResponsePokemonService) => {
      this.pokes = response.data;
   },
   a=> console.log(a))
  }

  getSetsDb(){
     this.sets = this.db.read().filter(x=> x)
  }

  newSet(){
    this.router.navigateByUrl('create')
  }

  remove(name:string){
    this.db.delete(name);
    this.getSetsDb();
  }

  edit(name:string){
    this.router.navigate(['edit'], { queryParams: { name } })
  }

  detail(name:string){
    this.router.navigate(['detail'], { queryParams: { name } })
  }

  
}
