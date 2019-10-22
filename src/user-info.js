import { api } from './api.js';
import { userName } from './index.js';
import { userJob } from './index.js';
import { userPhoto } from './index.js';
import { Popup } from './popups.js';
import { editBttn } from './popups.js';
import { avatarForm } from './popups.js';
import { avatarLinkField } from './popups.js';
const root = document.querySelector('.root');
export const avaBttn = root.querySelector('.user-info__photo');
const popupAva = root.querySelector('.popup-avatar');
const popupEditProfile = document.querySelector('.popup-profile');
const popupInfo = new Popup(popupEditProfile, editBttn);
const popupUserpic = new Popup(popupAva, avaBttn);
const avaSaveBttn = root.querySelector('.ava-save-button');

api.getProfile()
.then((data) => {
  userName.textContent = data.name;
  userJob.textContent = data.about;
  userPhoto.setAttribute('src', data.avatar);
  })
.catch((err) => {
  console.log(err);
});

function changeInfo(personValue, aboutValue) {
    userName.textContent = personValue;
    userJob.textContent = aboutValue;
}

function editInfo(event) {
    event.preventDefault();
    const form = document.forms.edit;
    const person = form.elements.person;
    const about = form.elements.about;
  
    api.updateProfile(person.value, about.value)
    .then(() => {
      changeInfo(person.value, about.value);
      popupInfo.close();
      form.reset();
    })
    .catch((err) => {
      console.log(err);
    })
}

document.forms.edit.addEventListener('submit', editInfo);

avaSaveBttn.addEventListener('click', function(event){
    event.preventDefault();
    api.changeAvatar(avatarLinkField.value)
    .then(() => {
      userPhoto.setAttribute('src', avatarLinkField.value);
      popupUserpic.close();
      avatarForm.reset();
    })
});
