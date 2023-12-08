import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxOverlayService, IgxPaginatorComponent, IgxSnackbarComponent } from 'igniteui-angular';
import { Card, ResponsePokemonService, SetCard } from 'src/app/models/all-models';
import { PokemonDbService } from 'src/app/pokemon-db.service';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  set:SetCard = { name:'', cards: []};
  data: Card[] = [];
  pokesFilter: Card[] = [];
  pokeSelect!: Card;
  name:string = '';
  searchName:string = '';
  isEdit = false;
  limitCardsName = 4;
  _overlayId = '';
  messageError = '';
  loading: boolean = false;
  itemsPerPage = [250];
  init = 0;
  totalCount!: number;
  
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;
  @ViewChild('cardDetail', {read: ElementRef})
  private element!: ElementRef;

  constructor(
    private db:PokemonDbService,
    private service:PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    @Inject(IgxOverlayService) private overlayService: IgxOverlayService
    ) {
      this.getAllPokes(this.init);
      this.route.queryParams.subscribe(params => {
        if(params['name']){
          this.name = params['name']; 
          this.changeName()
          this.isEdit = true;
        }
     });
  }

  getAllPokes(page:number){
    this.loading = true;
    this.pokesFilter = [];
    this.service.getAll(page).subscribe((response:ResponsePokemonService) => {
       this.data = response.data;
       this.pokesFilter = response.data;
       this.totalCount = response.totalCount;
       this.loading = false;
    }, a=> this.loading = false)
   }


  changeName(){
    let setDb = this.db.getByName(this.name);
    this.set = setDb;
  }

  search(){

    if(!this.searchName) return this.getAllPokes(this.init);

    this.loading = true;

    this.service.searchName(this.searchName).subscribe((response:ResponsePokemonService) => {
      this.data = response.data;
      this.pokesFilter = response.data;
      this.totalCount = response.totalCount;
      this.loading = false;
   }, a=> this.loading = false)
  }

  addCard(pokeId:string, snackbar: IgxSnackbarComponent){
    let pokeCard = this.pokesFilter?.find(x=> x.id == pokeId);

    if(!pokeCard) return;

    let exceededLimit = this.set.cards.filter(x=> x.name == pokeCard?.name).length >= this.limitCardsName;
    if(exceededLimit) {
      this.translate.get("Form_LimitCardName").subscribe(x=> this.messageError = x)
      snackbar.open();
      return;
    };

    if(this.set.cards.length == 60 ) {
      this.translate.get("Form_LimitCard").subscribe(x=> this.messageError = x)

      snackbar.open();
      return;
    };
    
    this.set.cards.push(pokeCard);
  }

  save(snackbar: IgxSnackbarComponent){

    if(!this.name) {
      this.translate.get("Form_NameRequired").subscribe(x=> this.messageError = x)
      snackbar.open();
      return;
    };

    if(this.set.cards.length < 24 ) {
      this.translate.get("Form_MinCard").subscribe(x=> this.messageError = x)
      snackbar.open();
      return;
    };

    if(this.isEdit){
      this.db.update(this.name,this.set);
    }else{
      this.db.create(this.set);
    }
    this.router.navigateByUrl('')
  }

  remove(id:string){
   let index = this.set.cards.findIndex((x:Card)=> x.id == id);
   if (index !== -1) {
    this.set.cards.splice(index, 1);
    }
  }
  
  showOverlay(pokeCard:Card) {
    if (!this._overlayId) {
        this._overlayId = this.overlayService.attach(this.element);
    }
    this.pokeSelect = pokeCard;
    this.overlayService.show(this._overlayId);
  }

  nexPage(event:any){
    this.getAllPokes(event.next)
  }

}
