import { saveBttn } from './index.js';
import { userName } from './index.js';
import { userJob } from './index.js';
import { errorFieldTop } from './index.js';
import { errorSymbolsTop } from './index.js';
import { errorFieldBottom } from './index.js';
import { errorSymbolsBottom } from './index.js';

export class Popup {
    constructor(popupElem, button){
      this.popupElem = popupElem;
      this.button = button;
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.popupElem.querySelector('.popup__close').addEventListener('click', this.close);
      this.button.addEventListener('click', this.open);
    }

    open() {
      this.popupElem.classList.add('popup_is-opened');
  
    }
  
    close(){
      this.popupElem.classList.remove('popup_is-opened');
    }
}

const root = document.querySelector('.root');
export const avatarForm = document.forms.avatar;
export const avatarLinkField = avatarForm.elements.ava_link;
export const editBttn = root.querySelector('.user-info__edit-button');
const scaledPopup = root.querySelector('.popup-big');
const placesList = root.querySelector('.places-list');

editBttn.addEventListener('click', function(){
    const personString = userName.innerHTML;
    const jobString = userJob.innerHTML;
    const form = document.forms.edit;
    let person = form.elements.person;
    let about = form.elements.about;
    person.value = personString;
    about.value = jobString;
    saveBttn.classList.add('button-enabled');
    errorFieldTop.classList.remove('fields-top-open');
    errorFieldBottom.classList.remove('fields-bottom-open');
    errorSymbolsBottom.classList.remove('symbols-bottom-open');
    errorSymbolsTop.classList.remove('symbols-top-open');
});

placesList.addEventListener('click', function (event) {
    event.stopPropagation()
    const { target } = event;
    if (target.classList.contains('place-card__image')) {
      const pictureBttn = document.querySelector('.place-card__image');
      const popupPicture = new Popup(scaledPopup, pictureBttn);
      popupPicture.open();
      const linkValue = target.style.backgroundImage;
      const popupImage = root.querySelector('.popup-image');
      const linkValueFormatted = linkValue.slice(linkValue.indexOf('url') + 5, -2);
      popupImage.setAttribute('src', linkValueFormatted);
    }
});