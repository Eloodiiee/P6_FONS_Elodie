import { photographerPage } from "../factories/photographersFactory.js"; // Importation de la factory pour l'affichage des infos du photographe
import { displayMedia } from "../factories/photographersFactory.js";  // Importation de la factory pour l'affichage des medias

// Je crée une classe qui va fetch les photographes en ne gardant que le photographe selectionné
class thePhotographer { 
    constructor() {
        this.data = []; // initialisation du this.data grace au constructor
        this.photographer = null; //Initialisation du this.photographer grace au constructor
        this.media = []; // Initialisation du this.media grace au constructor
        this.dataMedia = [] ; // Initialisation du this.dataMedia grace au constructor
        this.likes = 0; //  Initialisation du this.likes grace au constructor
    }


    //Fonction asynchrone de fetch et de tri des photographes
    async getPhotographer() {
        const currentUrl = (new URL(document.location)).searchParams ; // Permet de récupérer les informations dans l'URL
        const _id = currentUrl.get('id'); // Récupération de l'ID dans l'URL
        console.log(_id); // Affichage de l'ID grâce a l'URL
        const response = await fetch(`/data/photographers.json`)  
        const res = await response.json(); 
        this.data = res.photographers; // Séparation du JSON pour ne garder que les photographes
        console.log(this.data); // Affichage du photographes
        this.dataMedia = res.media; // Séparation du JSON pour ne garder que les medias
        console.log(this.dataMedia); // Affichage de tout les medias
        

        this.data.forEach((photographerData) => { // Boucle forEach qui permet de naviguer dans l'array des photographes
            if(photographerData.id == _id){ // Vérifications du photographe grâce à son ID
                photographerInfos.photographer = photographerData; //Récupération du photographe recherché
                console.log(photographerData); // Affichage du photographe de la page actuelle 
                this.dataMedia.forEach((media) => { //  Boucle forEach qui permet de naviguer dans l'array des medias du photographe
                    if(media.photographerId == _id){ // Vérifications des medias grâce à l'ID du photographe
                        this.likes += media.likes; // Somme de tout les likes du photographe
                        this.media = media; // Je récupère les informations des media
                        console.log(this.media); // je les affiche en log
                        photographerInfos.displayMedia(); // J'appele la function de la factory displayMedia
                    }
                });
                console.log(this.likes); // Affichage de la somme des likes
                
            }
        }) 
        photographerInfos.headerData(); // Appel de la fonction headerData() à partir des infos du photographe
        photographerInfos.bottomRightContainer(); // Appel de la fonction bottomRightContainer() à partir des infos du photographe et de ses medias (like bas de page)
        photographerInfos.updateLikes();
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
    likesSpan.innerHTML = `${this.likes} <i class="fa-solid fa-heart"></i>`; // J'assigne le texte des likes 
    const pricePerDaySpan = document.createElement("span"); // Je crée un span pour le prix par jour en bas de la page
    pricePerDaySpan.classList.add("priceDay"); // J'ajoute la classe priceDay
    pricePerDaySpan.innerHTML = `${this.photographer.price} $ / jour`; // J'assigne le texte du prix du photographe

    bottomRightContainer.appendChild(likesSpan); // J'assigne le parent du span des likes au container du bas de page
    bottomRightContainer.appendChild(pricePerDaySpan); // J'assigne le parent du prix par jour au container du bas de page

    mainSection.appendChild(bottomRightContainer) // J'assigne le parent du container du bas de page au main 
}
photographerInfos.displayMedia = function () { // Function d'affichage des medias
   displayMedia(this.media);// Appel de la factory pour l'affichage des medias
}
photographerInfos.updateLikes = function () {
    const likeBtn = document.querySelectorAll(".clickable");
    let liked = false;
    console.log(likeBtn);
    likeBtn.forEach((like) => {
        like.addEventListener("click", () => {
            if(liked == false){
                like.classList.remove("fa-regular");
                like.classList.add("fa-solid");
                liked = true;
                this.likes = this.likes+1;
                this.media.likes = this.media.likes+1;
                console.log(this.likes);
                console.log(this.media.likes);
            }
            else{
                like.classList.remove("fa-solid");
                like.classList.add("fa-regular");
                liked = false;
                this.likes = this.likes-1;
                this.media.likes = this.media.likes-1;
                console.log(this.likes);
                console.log(this.media.likes);
            }
        })
            console.log("click");   
    }) 
}