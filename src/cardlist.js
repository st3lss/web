import {Card} from './cards';

export class СardList {
    constructor(container, cards) {
      this.container = container;
      this.cards = cards;
      this.render();
    }
  
    addCard(name, link) {
      const { cardElement } = new Card(name, link);
      this.container.appendChild(cardElement);
    }
  
    render(){
      this.cards.forEach((card) => {
        this.addCard(card.name, card.link);
      });
    }
}
