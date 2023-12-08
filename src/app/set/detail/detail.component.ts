import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxOverlayService } from 'igniteui-angular';
import { Card, SetCard } from 'src/app/models/all-models';
import { PokemonDbService } from 'src/app/pokemon-db.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  set!:SetCard;
  _overlayId: any;
  pokeSelect!: Card;
  qtySupertype!:number;
  supertypeTrainer= 'Trainer';
  types:string[] = [];
  @ViewChild('cardDetail', {read: ElementRef})
  element!: ElementRef;

  constructor(
    private db:PokemonDbService,
    private route: ActivatedRoute,
    private overlayService:IgxOverlayService
    ) {
      this.route.queryParams.subscribe(params => {
      this.set = this.db.getByName(params['name']);
      this.loadQty();
     });
     
  }
  
  showOverlay(pokeCard:Card) {
      if (!this._overlayId) {
          this._overlayId = this.overlayService.attach(this.element);
      }
      this.pokeSelect = pokeCard;
      this.overlayService.show(this._overlayId);
  }

  loadQty(){
    this.qtySupertype = this.set.cards.filter((x:Card)=> x.supertype == this.supertypeTrainer).length;
    var types:string[] = [];

    for (let index = 0; index < this.set.cards.length; index++) {
      const card = this.set.cards[index];
      
      if(!card.types) continue;

      for (let index = 0; index < card.types.length; index++) {
        const type = card.types[index];
        if(types.indexOf(type) == -1)  {
          types.push(type)
        }
      }
     
    }

    for (let index = 0; index < types.length; index++) {
      const type = types[index];
      let qty = this.set.cards.filter((x:Card)=> x.types && x.types.indexOf(types[index]) > -1).length;
      this.types.push(type +': ' +qty); 
    }

  }


}
