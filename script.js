
class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.cardElement = this.create(name, link);
    this.cardElement
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);
    this.cardElement
    .querySelector('.place-card__delete-icon')
    .addEventListener('click', this.remove);
    this.create()
  }

  create() { 
    const trackPlacesList = document.createElement('div');
    trackPlacesList.classList.add('place-card');
    trackPlacesList.setAttribute('data-id', 111);

    const imgCard = document.createElement('div');
    imgCard.classList.add('place-card__image');
    imgCard.style.backgroundImage = `url(${this.link})`;
    

    const imgButton = document.createElement('button');
    imgButton.classList.add('place-card__delete-icon');
    imgCard.appendChild(imgButton);

    const nameCard = document.createElement('div');
    nameCard.classList.add('place-card__description');

    const name = document.createElement('h3');
    name.classList.add('place-card__name');
    name.textContent = this.name;

    const nameButton = document.createElement('button');
    nameButton.classList.add('place-card__like-icon');
  
    nameCard.appendChild(name);
    nameCard.appendChild(nameButton);

    trackPlacesList.appendChild(imgCard);    
    trackPlacesList.appendChild(nameCard);   
    

    imgCard.addEventListener('click', () => {       // обработчик открытия картинки в поп
      console.log(this.link);
      const popImg = document.querySelector('.pop-image__img');
      popImg.setAttribute('src', this.link);
      popPop.open();
    });
    
    return trackPlacesList;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked'); // ЛАЙК карточки
  }

  remove() {  
    event.stopPropagation();
    event.target.closest('.place-card').remove();     // обработчик удаления карточки 
  }
}

class CardList{
  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
    this.render();
  }
  addCard(name, link) {
    const { cardElement } = new Card(name, link);
    this.container.appendChild(cardElement);
  }
  render() {
    this.cards.forEach((card) => {
    this.addCard(card.name, card.link);
  })
  }
}

class Popup {
  constructor(popupElem, button){
   this.popupElem = popupElem;
   this.button = button;

   this.open = this.open.bind(this)
   this.close = this.close.bind(this)

   this.button.addEventListener('click', this.open);
   this.popupElem.querySelector('.popup__close').addEventListener('click', this.close);   
  }
  open() {
    this.popupElem.classList.add('popup_is-opened');
  }
  close(){
    this.popupElem.classList.remove('popup_is-opened');
  }
}

class PopupProf {
  constructor(popupElem, button){
   this.popupElem = popupElem;
   this.button = button;
   this.open = this.open.bind(this)
   this.close = this.close.bind(this)
   this.button.addEventListener('click', this.open);
   this.popupElem.closest('.root').querySelector('.popup-profile__close').addEventListener('click', this.close);   
  }
  open() {
    this.popupElem.classList.add('popup-profile_is-opened');
  }
  close(){
    this.popupElem.classList.remove('popup-profile_is-opened');
  }
}

class Pop {
  constructor(popupElem){
   this.popupElem = popupElem;

   this.open = this.open.bind(this)
   this.close = this.close.bind(this)

   this.popupElem.querySelector('.pop__close').addEventListener('click', this.close);   
  }
  open() {
      this.popupElem.classList.add('pop_is-opened');
  }
  close(){
    this.popupElem.classList.remove('pop_is-opened');
  }
}

class Api {
  constructor(baseUrl, auth, cardId) {
    this.baseUrl = baseUrl
    this.auth = auth
    this.cardId = cardId;
  }
  getInitialCards() {
      return fetch(`${this.baseUrl}/cards`,{ // <-- возвращаем промис с данными
        method: 'GET',
        headers: {
          authorization: this.auth,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`,{ // <-- возвращаем промис с данными
        method: 'GET',
        headers: {
          authorization: this.auth,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  updateProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: this.auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       name: `${name}`,
       about: `${about}`
      })
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }  
  postAddCards(name, link) {
    return fetch(`${this.baseUrl}/cards`,{
      method: 'POST',
      headers: {
        authorization: this.auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       name: `${name}`,
       link: `${link}`,
      })
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

const api = new Api('http://95.216.175.5/cohort3', 'e14d84fa-a2be-4d9f-ba0d-395d6d9e6754');

let placesList;
api.getInitialCards() 
.then((result) => {
  placesList = new CardList (document.querySelector('.places-list'), result)      
})
.catch((err) => console.log(err));



api.getUserInfo()
.then((result) => {
  document.querySelector('.user-info__name').textContent = result.name;
  document.querySelector('.user-info__job').textContent = result.about;
  document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${result.avatar})`)
})
.catch((err) => console.log(err));

const popup = document.querySelector('.popup') //Попап карточки
const userInfoButton = document.querySelector('.user-info__button') //кнопка открыть форму карточки
const popupCard = new Popup(popup, userInfoButton);
const popupProfile = document.querySelector('.popup-profile') //Попап изменения профиля
const userButton = document.querySelector('.user-info__editbutton') //кнопка открыть форму профиля
const popupProf = new PopupProf(popupProfile, userButton);
const pop = document.querySelector('.pop'); //Попап картинки
const popPop = new Pop(pop);  // экземпляр класса открытия формы картинки
const popupBtn = document.querySelector('.popup__button'); //кнопка сохранения карточки
const popupBtnPrf = document.querySelector('.popup-profile__button'); //кнопка сохранения профиля


userButton.textContent = 'Edit';


const form = document.forms.new;

form.addEventListener('input', function (event) {
    const form = event.currentTarget;
    const name = form.elements.name;
    const link = form.elements.link;
    const popupValidName = document.querySelector('.popup__valid-name');
    const popupValidLink = document.querySelector('.popup__valid-link');

    if (name.value.length != 0 & link.value.length != 0) {   // условие для кнопки
        popupBtn.removeAttribute('disabled', true);
        popupBtn.classList.add('popup__button_act');
    } else {
        popupBtn.setAttribute('disabled', true);
        popupBtn.classList.remove('popup__button_act');
    };

    
    if (name.value.length === 0) {                      // валидация имени
      popupValidName.innerHTML = "Это обязательное поле";
      popupBtn.setAttribute('disabled', true);
      popupBtn.classList.remove('popup__button_act');
    } else if (name.value.length === 1 || name.value.length > 30 ) {
      popupValidName.innerHTML = "Должно быть от 2 до 30 символов";
      popupBtn.setAttribute('disabled', true);
      popupBtn.classList.remove('popup__button_act');
    }
    else {
        popupValidName.innerHTML = "";
    };


    if (link.value.length === 0) {   // валидация ссылки
      popupValidLink.innerHTML = "Это обязательное поле";
      popupBtn.setAttribute('disabled', true);
      popupBtn.classList.remove('popup__button_act');
    } else if (link.value.length === 1) {
      popupValidLink.innerHTML = "Должно быть от 2 символов";
      popupBtn.setAttribute('disabled', true);
      popupBtn.classList.remove('popup__button_act');
    }
    else {
        popupValidLink.innerHTML = "";
    };
});


function changeProfile(event) {       // функция активации редактирования профиля
    event.preventDefault();
    const form = document.forms.last;
    const nameName = form.elements.nameprofile;
    const abotAbout = form.elements.aboutprofile;
    api.updateProfile(nameName.value, abotAbout.value)
      .then((data) => {
        console.log(data);
        document.querySelector('.user-info__name').textContent = nameName.value;
        document.querySelector('.user-info__job').textContent = abotAbout.value
        })
      .catch((err) => console.log(err));
    
    popupProfile.classList.remove('popup-profile_is-opened');
};

const profileForm = document.forms.last;

profileForm.addEventListener('input', function (event) {
    const last = event.currentTarget;
    const nameName = last.elements.nameprofile;
    const aboutAbout = last.elements.aboutprofile;
    const popupValidName = document.querySelector('.popup__valid-namename');
    const popupValidLink = document.querySelector('.popup__valid-aboutabout');

    if (nameName.value.length !== 0 & aboutAbout.value.length !== 0) {   // условие для кнопки
        popupBtnPrf.removeAttribute('disabled', true);
        popupBtnPrf.classList.add('popup-profile__button_act');
    } else {
        popupBtnPrf.setAttribute('disabled', true);
        popupBtnPrf.classList.remove('popup-profile__button_act');
    } 

    if (nameName.value.length === 0) {                      // валидация имени профиля
        popupValidName.innerHTML = "Это обязательное поле";
        popupBtnPrf.setAttribute('disabled', true);
        popupBtnPrf.classList.remove('popup-profile__button_act');
    } else if (nameName.value.length === 1 || nameName.value.length > 30 ) {
      popupValidName.innerHTML = "Должно быть от 2 до 30 символов";
      popupBtnPrf.setAttribute('disabled', true);
        popupBtnPrf.classList.remove('popup-profile__button_act');
    }
    else {
        popupValidName.innerHTML = "";
    };

    if (aboutAbout.value.length === 0) {        // валидация профессии профиля
      popupValidLink.innerHTML = "Это обязательное поле";
      popupBtnPrf.setAttribute('disabled', true);
      popupBtnPrf.classList.remove('popup-profile__button_act');
    } else if (aboutAbout.value.length === 1 || aboutAbout.value.length > 30 ) {
      popupValidLink.innerHTML = "Должно быть от 2 до 30 символов";
      popupBtnPrf.setAttribute('disabled', true);
      popupBtnPrf.classList.remove('popup-profile__button_act');
    }
    else {
      popupValidLink.innerHTML = "";
    };
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  placesList.addCard(form.elements.name.value, form.elements.link.value);
  api.postAddCards(form.elements.name.value, form.elements.link.value) 
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err));
  popup.classList.remove('popup_is-opened');
});

document.forms.last.addEventListener('submit', changeProfile);















/*
  Часть замечаний исправлено, но с методом updateProfile и его использованием ещё есть проблемы
*/

/*  
  Запросы к серверу выполняются и данные приходят, это хорошо, но по организации кода есть замечания,
  которые необходимо исправить. Хотя класс Api создан, но он никак не используется.
  Запросы к серверу разбросаны по коду. Необходимо использовать класс Api и делать запросы 
  через его методы. 
  Также отсутсвует обработка ошибок на тот случай если запрос выполнится неудачно. 
  В конце цепочки блоков then болжна быть обработка ошибок блоком catch, хотя бы вывод их в консоль.

  Желательно не размещать работу с элементами на странице в классе Api, а 
  возвращать из его методов промисы с данными, как это сделать я показал на примере в классе Api
*/


