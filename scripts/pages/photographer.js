 /**   J'importe les factories : **
  ** - Du bandeau du photographe **
  ** - De l'affichage des Medias **
  ** - L'utils du formulaire     **
  ** - L'utils du nom du photographe dans le formulaire **/

import { photographerPage } from "../factories/photographersFactory.js";
import { displayMedia } from "../factories/photographersFactory.js";
import { contactForm } from "../utils/formularRegister.js";
import { contactName } from "../utils/formularRegister.js";

/** Je déclare la classe "thePhotographer", qui permet de d'organiser les informations et les medias du photographe sélectionné **/ 
class thePhotographer {
  constructor() {
    this.data = [];
    this.photographer = null;
    this.dataMedia = [];
    this.media = [];
    this.likes = 0;
    this.eInit();
    this.index = 0;
  }
  eInit() {
    const formModal = document.getElementById("modalRegistering");
    formModal.addEventListener("click", (e) => {
      e.preventDefault();
      contactForm(this);
    });
  }
/** Function asychrone de fetch pour recupérer les informations et les medias du photographe **/
  async getPhotographer() {
    const currentUrl = new URL(document.location).searchParams;
    const _id = currentUrl.get("id");
    console.log("Photographer ID : ", _id);
    const response = await fetch("./data/photographers.json");
    const res = await response.json();
    this.data = res.photographers;
    console.log("Photographers Array : ", this.data);
    this.dataMedia = res.media;
    console.log("Medias Array : ", this.dataMedia);

/** Permet de compiler les informations et les medias du photographe dans le constructor **/ 
    this.data.forEach((photographerData) => {
      if (photographerData.id == _id) {
        photographerInfos.photographer = photographerData;
        console.log("Photographer's Data : ", photographerData);
        this.dataMedia.forEach((media) => {
          if (media.photographerId == _id) {
            this.media.push(media);
            this.likes += media.likes;
          }
        });
        console.log("Photographer's Medias : ", this.media);
        console.log("Photographer's total likes : ", this.likes);
      }
    });
/** Je fais appel a toutes les functions de la page **/ 
    photographerInfos.headerData();
    photographerInfos.sortMedia();
    photographerInfos.mainFunctions();
    photographerInfos.contactName();
  }
}
/** J'instancie le photographe dans la classe "thePhotographer" **/
const photographerInfos = new thePhotographer();
photographerInfos.getPhotographer();

photographerInfos.headerData = function () {
  photographerPage(this.photographer);
};
photographerInfos.mainFunctions = function () {
  photographerInfos.displayMedia();
  photographerInfos.bottomRightContainer();
  photographerInfos.updateLikes();
  photographerInfos.lightbox();
};
/** Affichage du compteur des likes; tarif/jour de tout les medias  **/
photographerInfos.bottomRightContainer = function () {
  const mainSection = document.getElementById("main");
  const bottomRightContainer = document.createElement("div");
  bottomRightContainer.classList.add("bottomRightContainer");

  const likesSpan = document.createElement("span");
  likesSpan.classList.add("likes");
  const likesSpanValue = document.createElement("span");
  likesSpanValue.classList.add("likesSpanValue");
  likesSpanValue.innerHTML = `${this.likes} `;
  const likesHeart = document.createElement("i");
  likesHeart.classList.add("fa-solid");
  likesHeart.classList.add("fa-heart");
  const pricePerDaySpan = document.createElement("span");
  pricePerDaySpan.classList.add("priceDay");
  pricePerDaySpan.innerHTML = `${this.photographer.price}$ / jour`;

  likesSpan.appendChild(likesSpanValue);
  likesSpan.appendChild(likesHeart);
  bottomRightContainer.appendChild(likesSpan);
  bottomRightContainer.appendChild(pricePerDaySpan);

  mainSection.appendChild(bottomRightContainer);
};
/** Permet de regarder que l'index est mis à jour pour que ça défile les images correctement dans la lightbox **/
photographerInfos.updateMediaClickHandlers = function () {
  const medias = document.querySelectorAll(".mediaBox");
  medias.forEach((mediaBox, index) => {
    mediaBox.firstChild.addEventListener("click", () => {
      this.index = index; // Met à jour l'index basé sur l'ordre actuel après le tri
      photographerInfos.displayLightbox(this.index);
    });
  });
};
/** Function qui permet de trier les medias en fonction des filtres **/
photographerInfos.sortMedia = function () {
  const mediaContainer = document.getElementById("mediaContainer");
  const selectedBox = document.querySelector(".selectedBox");
  const chevronCursor = document.querySelector(".fa-chevron-down");
  const filters = document.querySelector(".filters");
  const options = document.querySelectorAll(".filters li");
  const selected = document.querySelector(".selected");
/** Ouverture du menu filtre **/
  selectedBox.addEventListener("click", () => {
    chevronCursor.classList.toggle("chevron-rotate");
    filters.classList.toggle("filters-open");
  });
/** Gere la fermeture du menu des filtres quand je selectionne un filtre **/
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      chevronCursor.classList.remove("chevron-rotate");
      filters.classList.remove("filters-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
      /** Tri des medias par filtre **/
      if (selected.innerText == "Popularité") {
        this.media.sort((a, b) => b.likes - a.likes);
      } else if (selected.innerText == "Date") {
        this.media.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (selected.innerText == "Titre") {
        this.media.sort((a, b) => a.title.localeCompare(b.title));
      }
/** Vide le containeur des medias **/
/** Actualisation des functions une fois les medias mis à jour par les filtres **/
      mediaContainer.innerHTML = "";
      photographerInfos.displayMedia();
      photographerInfos.updateMediaClickHandlers();
      photographerInfos.updateLikes();
      /** Réinitialise l'index de la lightbox si le média est visible **/
      if (this.index >= 0 && this.index < this.media.length) {
        const currentLightboxMedia = this.media[this.index];
        this.index = this.media.findIndex(
          (m) => m.id === currentLightboxMedia.id
        );
      }
    });
  });
};
/** Function d'ffichage des medias grâce à la factory **/
/** Rattache les medias au gestionnaire d'évenement **/
photographerInfos.displayMedia = function () {
  const mediaContainer = document.getElementById("mediaContainer");
  mediaContainer.innerHTML = ""; // Supprime les anciens éléments médias
  displayMedia(this.media, this.displayLightbox.bind(this)); // Crée de nouveaux éléments médias
  photographerInfos.updateMediaClickHandlers();
};
/** Function qui permet de liker les medias et qui met à jour le compteur en bas à droite **/
photographerInfos.updateLikes = function () {
  const likeBtn = document.querySelectorAll(".likeBtn");
  const likeBottomRight = document.querySelector(".likesSpanValue");
  const likeValue = document.getElementsByClassName("likeValue");
  for (let i = 0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener("click", () => {
      if (likeBtn[i].classList.contains("fa-regular") === true) {
        likeBtn[i].classList.remove("fa-regular");
        likeBtn[i].classList.add("fa-solid");
        this.media[i].likes++;
        this.likes++;
        console.log("Liké ! ", this.media[i].likes);
      } else if (likeBtn[i].classList.contains("fa-solid") === true) {
        likeBtn[i].classList.remove("fa-solid");
        likeBtn[i].classList.add("fa-regular");
        this.media[i].likes--;
        this.likes--;
        console.log("Like enlevé ! ", this.media[i].likes);
      }
      likeValue[i].innerHTML = `${this.media[i].likes} `;
      likeBottomRight.innerHTML = `${this.likes} `;
    });
  }
};
 /** appel la function contactName que j'importe plus haut **/
photographerInfos.contactName = function () {
  contactName(this.photographer);
};
/** Function lightbox quand je clique sur un media il s'affiche en grand et je peux passer sur suivant ou précedent **
 ** en cliquant sur les flèches, ou en utilisant les touches du clavier **
 ** Je peux fermer la lightbox en cliquant sur le bouton croix ou en appuyant sur echap **/
photographerInfos.lightbox = function () {
  const medias = document.querySelectorAll(".mediaBox");
  console.log(medias);
  this.index = 0;
  const lightbox = document.querySelector("#lightbox");
  const closeBtn = document.querySelector("#closeBtn");
  const rightArrow = document.querySelector(".fa-chevron-right");
  const leftArrow = document.querySelector(".fa-chevron-left");
  const mediaContainerLightbox = document.querySelector(
    ".mediaContainerLightbox"
  );
  for (let i = 0; i < medias.length; i++) {
    const selectedMedia = medias[i].firstChild;
    selectedMedia.addEventListener("click", () => {
      this.index = i;
      photographerInfos.displayLightbox(this.index);
    });
  }
  const keyboardHandler = (e) => {
    if (e.key === 'ArrowRight') {
      this.index = (this.index + 1) % this.media.length;
      this.displayLightbox(this.index);
    } else if (e.key === 'ArrowLeft') {
      this.index = (this.index - 1 + this.media.length) % this.media.length;
      this.displayLightbox(this.index);
    } else if (e.key === 'Escape') {
      this.closeLightbox();
    }
  };
  document.addEventListener('keydown', keyboardHandler);

  rightArrow.addEventListener("click", () => {
    this.index = (this.index + 1) % this.media.length; /** Cela permet de boucler au début si on atteint la fin **/
    photographerInfos.displayLightbox(this.index);
  });

  leftArrow.addEventListener("click", () => {
    this.index = (this.index - 1 + this.media.length) % this.media.length; /**  Cela permet de boucler à la fin si on atteint le début **/
    photographerInfos.displayLightbox(this.index);
  });
  closeBtn.addEventListener("click", () => {
    mediaContainerLightbox.removeChild(mediaContainerLightbox.firstChild);
    mediaContainerLightbox.removeChild(mediaContainerLightbox.lastChild);
    lightbox.classList.remove("active");
  });
};
/** Function qui permet de supprimer les enfants de la lightbox quand elle se ferme et désactive les eventListener du clavier **/
photographerInfos.closeLightbox = function() {
  const mediaContainerLightbox = document.querySelector(".mediaContainerLightbox");
  while (mediaContainerLightbox.firstChild) {
    mediaContainerLightbox.removeChild(mediaContainerLightbox.firstChild);
  }
  const lightbox = document.querySelector("#lightbox");
  lightbox.classList.remove("active");
  document.removeEventListener('keydown', this.keyboardNavigationBound);
};

photographerInfos.displayLightbox = function (index) {
  const mediaContainerLightbox = document.querySelector(
    ".mediaContainerLightbox"
  );

  while (mediaContainerLightbox.firstChild) {
    mediaContainerLightbox.removeChild(mediaContainerLightbox.firstChild);
  }

  /** Affiche le média en fonction de l'index **/
  const media = this.media[index];
  let mediaElement;

  if (media.image) {
    mediaElement = document.createElement("img");
    mediaElement.src = `assets/medias/${media.photographerId}/${media.image}`;
    mediaElement.alt = media.title;
  } else if (media.video) {
    mediaElement = document.createElement("video");
    mediaElement.src = `assets/medias/${media.photographerId}/${media.video}`;
    mediaElement.title = media.title;
    mediaElement.controls = true;
  }

  let mediaTitle = document.createElement("span");
  mediaTitle.textContent = media.title;

  mediaContainerLightbox.appendChild(mediaElement);
  mediaContainerLightbox.appendChild(mediaTitle);

  /** Affiche la lightbox **/
  const lightbox = document.querySelector("#lightbox");
  lightbox.classList.add("active");
};
