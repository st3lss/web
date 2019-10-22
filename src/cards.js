import { api } from './api.js';
import { Popup } from './popups.js';
import { placesList } from './index.js';
import { СardList } from './cardlist.js';
const root = document.querySelector('.root');
const popupNewPlace = root.querySelector('.popup-newplace');
export const addBttn = root.querySelector('.user-info__button');
const popupPlace = new Popup(popupNewPlace, addBttn);

export class Card {
    constructor(name, link) {
      this.cardElement = this.create(name, link);
  
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }
  
    like(event) {
      if (event.target.classList.contains('place-card__like-icon')){
        event.target.classList.toggle('place-card__like-icon_liked');
      }
    }
  
    remove(event) {
      event.target.closest('.place-card').remove();
    }
  
    create(nameValue, linkValue) {
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card');
  
      const bg = document.createElement('div');
      bg.classList.add('place-card__image');
      bg.style.backgroundImage = `url(${linkValue})`;
  
      const descrp = document.createElement('div');
      descrp.classList.add('place-card__description');
  
      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name');
      cardName.textContent = nameValue;
  
      const deleteBttn = document.createElement('button');
      deleteBttn.classList.add('place-card__delete-icon');
  
      const likeBttn = document.createElement('button');
      likeBttn.classList.add('place-card__like-icon');
  
      placeCard.appendChild(bg);
      bg.appendChild(deleteBttn);
      placeCard.appendChild(descrp);
      descrp.appendChild(cardName);
      descrp.appendChild(likeBttn);
  
      return placeCard;
    }
}

let cardList;
api.getCards()
.then((data) => {
cardList = new СardList(placesList, data);
})
.catch((err) => console.log(err));

function newCard(event) {
    event.preventDefault();
    const form = document.forms.new;
    const name = form.elements.name;
    const link = form.elements.link;
    api.saveCard(name.value, link.value)
    .then(() => {
      cardList.addCard(name.value, link.value);
      popupPlace.close();
      form.reset();
    })
    .catch((err) => {
      console.log(err);
    })
}

document.forms.new.addEventListener('submit', newCard);