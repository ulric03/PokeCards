export interface ResponsePokemonService {
    data: Card[]
    page: number
    pageSize: number
    count: number
    totalCount: number
  }
  
  export interface Card {
    id: string
    name: string
    supertype: string
    subtypes: string[]
    hp: string
    types: string[]
    evolvesTo: string[]
    rules: string[]
    attacks: Attack[]
    weaknesses: Weakness[]
    retreatCost: string[]
    convertedRetreatCost: number
    set: Set
    number: string
    artist: string
    rarity: string
    nationalPokedexNumbers: number[]
    legalities: Legalities2
    images: Images2
    tcgplayer: Tcgplayer
  }
  
  export interface Attack {
    name: string
    cost: string[]
    convertedEnergyCost: number
    damage: string
    text: string
  }
  
  export interface Weakness {
    type: string
    value: string
  }
  
  export interface Set {
    id: string
    name: string
    series: string
    printedTotal: number
    total: number
    legalities: Legalities
    ptcgoCode: string
    releaseDate: string
    updatedAt: string
    images: Images
  }
  
  export interface Legalities {
    unlimited: string
    expanded: string
  }
  
  export interface Images {
    symbol: string
    logo: string
  }
  
  export interface Legalities2 {
    unlimited: string
    expanded: string
  }
  
  export interface Images2 {
    small: string
    large: string
  }
  
  export interface Tcgplayer {
    url: string
    updatedAt: string
    prices: Prices
  }
  
  export interface Prices {
    holofoil: Holofoil
  }
  
  export interface Holofoil {
    low: number
    mid: number
    high: number
    market: number
    directLow: number
  }
  

  export interface SetCard {
    
    name: string;
    cards:Card[];
  }