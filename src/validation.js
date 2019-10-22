import { plusBttn } from './index.js';
import { saveBttn } from './index.js';
import { errorFieldTop } from './index.js';
import { errorSymbolsTop } from './index.js';
import { errorFieldBottom } from './index.js';
import { errorSymbolsBottom } from './index.js';
import { avatarLinkField } from './popups.js';
import { avaSaveBttn } from './index.js';
import { avaBttn } from './user-info.js';
import { addBttn } from './cards.js';
const editInfoForm = document.forms.edit;
const userNameField = editInfoForm.elements.person;
const userJobField = editInfoForm.elements.about;
const newPlaceForm = document.forms.new;

avatarLinkField.addEventListener('input', function(){
    if (avatarLinkField.value.length === 0) {
      avaSaveBttn.classList.remove('button-enabled');
      avaSaveBttn.setAttribute('disabled', true);
    } else {
      avaSaveBttn.classList.add('button-enabled');
      avaSaveBttn.removeAttribute('disabled');
    }
});

editInfoForm.addEventListener('input', function(){
    if (userNameField.value.length < 2 || userJobField.value.length < 2 || userNameField.value.length > 30 || userJobField.value.length > 30) {
      saveBttn.classList.remove('button-enabled');
      saveBttn.setAttribute('disabled', true);
    } else {
      saveBttn.removeAttribute('disabled');
      saveBttn.classList.add('button-enabled');
    }
});

userNameField.addEventListener('input', function(){
    if (userNameField.value.length === 0){
      saveBttn.classList.remove('button-enabled');
      saveBttn.setAttribute('disabled', true);
      errorFieldTop.classList.add('fields-top-open');
    } else {
      errorFieldTop.classList.remove('fields-top-open');
      saveBttn.removeAttribute('disabled');
      saveBttn.classList.add('button-enabled');
    }
});
  
userNameField.addEventListener('input', function(){
    if (userNameField.value.length < 2 || userNameField.value.length > 30) {
      errorSymbolsTop.classList.add('symbols-top-open');
    } else {
      errorSymbolsTop.classList.remove('symbols-top-open');
    }
});
  
userJobField.addEventListener('input', function(){
    if (userJobField.value.length === 0) {
      saveBttn.classList.remove('button-enabled');
      saveBttn.setAttribute('disabled', true);
      errorFieldBottom.classList.add('fields-bottom-open');
    } else {
      saveBttn.classList.add('button-enabled');
      saveBttn.removeAttribute('disabled');
      errorFieldBottom.classList.remove('fields-bottom-open');
    }
});
  
userJobField.addEventListener('input', function(){
    if (userJobField.value.length < 2 || userJobField.value.length > 30) {
      errorSymbolsBottom.classList.add('symbols-bottom-open');
    } else {
      errorSymbolsBottom.classList.remove('symbols-bottom-open');
    }
});
  
newPlaceForm.addEventListener('input', function(){
    const placeName = newPlaceForm.elements.name;
    const placeLink = newPlaceForm.elements.link;
    if (placeName.value.length > 1 && placeLink.value.length > 1) {
      plusBttn.classList.add('button-enabled');
      plusBttn.removeAttribute('disabled');
   } else {
     plusBttn.setAttribute('disabled', true);
     plusBttn.classList.remove('button-enabled');
    }
});  

avaBttn.addEventListener('click', function(){
    avaSaveBttn.classList.remove('button-enabled');
    avaSaveBttn.setAttribute('disabled', true);
});

addBttn.addEventListener('click', function(){
    plusBttn.setAttribute('disabled', true);
    plusBttn.classList.remove('button-enabled');
});