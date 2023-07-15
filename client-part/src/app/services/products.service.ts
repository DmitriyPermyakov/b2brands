import { Injectable } from '@angular/core';
import { Product } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private product: Product[] = [];
  

constructor() {   
  this.product = [{ 
    id: "asdfasf",
    name: "Бейсболка Промо",
    code: "Б100-320К",
    price: "400",
    print: [ "Шелкография", "Шелкотрансферная печать", "Печать флексом, флоком", "DTF печать", "Вышивка"],
    productColors: [ { 
      id: 1,
      value: "#33ff00",
      frontSmallUrl: "../../assets/caps/front.png",
      leftSmallUrl: "../../assets/caps/left.png",
      bottomSmallUrl: "../../assets/caps/back.png",
      rightSmallUrl: "../../assets/caps/right.png"
    },
    { 
      id: 1,
      value: "#ff0000",
      frontSmallUrl: "../../assets/caps/front.png",
      leftSmallUrl: "../../assets/caps/left.png",
      bottomSmallUrl: "../../assets/caps/back.png",
      rightSmallUrl: "../../assets/caps/right.png"
    },
    { 
      id: 1,
      value: "#002cff",
      frontSmallUrl: "../../assets/caps/front.png",
      leftSmallUrl: "../../assets/caps/left.png",
      bottomSmallUrl: "../../assets/caps/back.png",
      rightSmallUrl: "../../assets/caps/right.png"
    },
    { 
      id: 1,
      value: "#002cff",
      frontSmallUrl: "../../assets/caps/front.png",
      leftSmallUrl: "../../assets/caps/left.png",
      bottomSmallUrl: "../../assets/caps/back.png",
      rightSmallUrl: "../../assets/caps/right.png"
    },
    { 
      id: 1,
      value: "#002cff",
      frontSmallUrl: "../../assets/caps/front.png",
      leftSmallUrl: "../../assets/caps/left.png",
      bottomSmallUrl: "../../assets/caps/back.png",
      rightSmallUrl: "../../assets/caps/right.png"
    }],

    productProps: [ { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    },
    { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    },
    { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    },
    { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    },
    { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    },
    { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    },
    { 
      id: 1,
      name: "Тип полотна",
      value: "Поплин"
    }]
  }];
  

}

  getAll(): Observable<Product[]> {
    return new Observable(s => {
      s.next(this.product);
    })
  }
}


