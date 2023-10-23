import { photographerPage } from "../factories/photographersFactory.js"; // Importation de la factory pour l'affichage des infos du photographe
import { displayMedia } from "../factories/photographersFactory.js";
// Je crée une classe qui va fetch les photographes en ne gardant que le photographe selectionné
class thePhotographer { 
    constructor() {
        this.data = []; // initialisation du this.data grace au constructor
        this.photographer = null; //Initialisation du this.photographer grace au constructor
        this.dataMedia = [] ; // Initialisation du this.dataMedia grace au constructor
        this.media = []; // Initialisation du this.media grace au constructor
        this.likes = 0; //  Initialisation du this.likes grace au constructor
    }


    //Fonction asynchrone de fetch et de tri des photographes
    async getPhotographer() {
        const currentUrl = (new URL(document.location)).searchParams ; // Permet de récupérer les informations dans l'URL
        const _id = currentUrl.get('id'); // Récupération de l'ID dans l'URL
        console.log("Photographer ID : ", _id); // Affichage de l'ID grâce a l'URL
        const response = await fetch(`/data/photographers.json`)  
        const res = await response.json(); 
        this.data = res.photographers; // Séparation du JSON pour ne garder que les photographes
        console.log("Photographers Array : ", this.data); // Affichage du photographes
        this.dataMedia = res.media; // Séparation du JSON pour ne garder que les medias
        console.log("Medias Array : ", this.dataMedia); // Affichage de tout les medias
        

        this.data.forEach((photographerData) => { // Boucle forEach qui permet de naviguer dans l'array des photographes
            if(photographerData.id == _id){ // Vérifications du photographe grâce à son ID
                photographerInfos.photographer = photographerData; //Récupération du photographe recherché
                console.log("Photographer's Data : ", photographerData); // Affichage du photographe de la page actuelle 
                this.dataMedia.forEach((media) => { //  Boucle forEach qui permet de naviguer dans l'array des medias du photographe
                    if(media.photographerId == _id){ // Vérifications des medias grâce à l'ID du photographe
                        this.media.push(media);// J'ajoute le contenu des medias dans this.media
                        this.likes += media.likes; // Somme de tout les likes du photographe
                    }
                });
                console.log("Photographer's Medias : ", this.media);// Affichage des medias en log
                console.log("Photographer's total likes : ", this.likes); // Affichage de la somme des likes
                
            }
        }) 
        photographerInfos.headerData(); // Appel de la fonction headerData() à partir des infos du photographe
        photographerInfos.displayMedia();// Appel de la function displayMedia(), à partir de la fatory
        photographerInfos.bottomRightContainer(); // Appel de la fonction bottomRightContainer() à partir des infos du photographe et de ses medias
        photographerInfos.updateLikes();// Appel de la function updateLikes()
    }   
}
//J'instencie le photographe dans la classe "thePhotographer"
const photographerInfos = new thePhotographer();
photographerInfos.getPhotographer(); // Appel de la fonction getPhotographer pour récuperer le photographe

photographerInfos.headerData = function (){// Function d'affichage du data du photographe
    photographerPage(this.photographer)   // Appel de la factory pour l'affichage des data du photographe
}

photographerInfos.bottomRightContainer = function () { // Function de l'affichage du container fixé dans le coin de page en bas à droite
    const mainSection = document.getElementById("main"); // Je sélectionne le main de la page du photographe
    const bottomRightContainer = document.createElement("div"); // Je crée une DIV 
    bottomRightContainer.classList.add("bottomRightContainer"); // J'ajoute la classe bottomRightContainer à la DIV

    const likesSpan = document.createElement("span"); // Je crée un span  pour les likes totaux en bas de la page
    likesSpan.classList.add("likes"); // J'ajoute la classe likes
    const likesSpanValue =  document.createElement("span"); // Je crée un span  pour la valeur des likes totaux en bas de la page
    likesSpanValue.classList.add("likesSpanValue");// J'ajoute la classe "likesSpanValue"
    likesSpanValue.innerHTML = `${this.likes} `; // J'assigne le texte des likes 
    const likesHeart = document.createElement("i");// Je crée un élément "i"
    likesHeart.classList.add("fa-solid")// J'ajoute la classe "fa-solid"
    likesHeart.classList.add("fa-heart")// J'ajoute la classe "fa-heart"
    const pricePerDaySpan = document.createElement("span"); // Je crée un span pour le prix par jour en bas de la page
    pricePerDaySpan.classList.add("priceDay"); // J'ajoute la classe priceDay
    pricePerDaySpan.innerHTML = `${this.photographer.price}$ / jour`; // J'assigne le texte du prix du photographe

    likesSpan.appendChild(likesSpanValue); // J'assigne le parent de likesSpan a likesSpanValue
    likesSpan.appendChild(likesHeart) // J'assigne le parent de likesSpan a likesHeart
    bottomRightContainer.appendChild(likesSpan); // J'assigne le parent du span des likes au container du bas de page
    bottomRightContainer.appendChild(pricePerDaySpan); // J'assigne le parent du prix par jour au container du bas de page

    mainSection.appendChild(bottomRightContainer) // J'assigne le parent du container du bas de page au main 
}

photographerInfos.displayMedia = function () { // Appel de la fonction displayMedia 
    displayMedia(this.media) // Appel de la fatory displayMedia
}

photographerInfos.updateLikes = function () { // Appel de la fonction updateLikes 
    const likeBtn = document.querySelectorAll(".likeBtn"); // Je selectionne les boutons des coeurs pour les likes
    const likeBottomRight = document.querySelector(".likesSpanValue"); // Je selectionne la valeur des likes totaux en bas a droite 
    const likeValue = document.getElementsByClassName("likeValue"); // Je selectionne la valeur des coeurs des medias 
    for(let i = 0; i < likeBtn.length; i++){ // J'assigne un chiffre selecteur pour les boutons like à l'aide de la boucle for
        likeBtn[i].addEventListener("click", () => { // J'assigne un événement au click du bouton like
            if(likeBtn[i].classList.contains("liked") === false){ // Si le bouton like ne contient pas la classe liked, alors 
                likeBtn[i].classList.remove("fa-regular"); // je retire la classe "fa-regular"
                likeBtn[i].classList.add("fa-solid"); // j'ajoute la classe "fa-solid"
                likeBtn[i].classList.add("liked"); // J'ajoute la classe liked
                this.media[i].likes++; // J'ajoute un like sur le media concerné
                this.likes++; // J'ajoute un like sur le total de like
                console.log("Liké ! ", this.media[i].likes); // console log pour montrer que ça a liké
                likeValue[i].innerHTML = `${this.media[i].likes} `; // J'affiche le like du media concerné
                likeBottomRight.innerHTML = `${this.likes} `; // J'affiche le total des likes des medias en bas de la page
            }
        })
        likeBtn[i].addEventListener("dblclick", () =>{ //// J'assigne un événement au double click du bouton like
            if(likeBtn[i].classList.contains("liked") === true){ // Si le bouton like  contient  la classe liked, alors
                likeBtn[i].classList.remove("fa-solid"); // je retire la classe "fa-solid"
                likeBtn[i].classList.remove("liked"); // J'enleve la classe liked
                likeBtn[i].classList.add("fa-regular"); // j'ajoute la classe "fa-regular"
                this.media[i].likes--; // Je retire un like sur le media concerné
                this.likes--; // Je retire un like sur le total de like
                console.log("Like enlevé ! ", this.media[i].likes); // console log pour montrer que ça a enlevé le like
                likeValue[i].innerHTML = `${this.media[i].likes} `; // J'affiche le like du media concerné
                likeBottomRight.innerHTML = `${this.likes} `; //  J'affiche le total des likes des medias en bas de la page
            }
        })
    }
}